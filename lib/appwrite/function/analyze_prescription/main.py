import os
import json
from openai import OpenAI

def main(context):
    openai_api_key = os.environ.get('OPENAI_API_KEY')
    
    if not openai_api_key:
        context.error("Missing OPENAI_API_KEY environment variable.")
        return context.res.json({
            "success": False, 
            "error": "Server configuration error: API Key missing"
        }, 500)

    client = OpenAI(api_key=openai_api_key)

    try:
        payload = context.req.body
        
        if isinstance(payload, str):
            payload = json.loads(payload)
            
        base64_image = payload.get('image')

        if not base64_image:
            return context.res.json({
                "success": False, 
                "error": "Image data missing in payload"
            }, 400)

    except Exception as e:
        context.error(f"Error parsing request: {str(e)}")
        return context.res.json({
            "success": False, 
            "error": f"Invalid JSON body: {str(e)}"
        }, 400)

    # 3. Prepare OpenAI Request
    prompt_messages = [
        {
            "role": "system",
            "content": (
                "You are an expert medical data extraction assistant. "
                "You will be given an image of a medical prescription. "
                "Your job is to analyze the image (including handwritten text) "
                "and extract the required information following a strict JSON schema. "
                "Respond ONLY with a single, valid JSON object. "
                "Do not add any introductory text, markdown formatting (like ```json), or explanations."
            )
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": (
                        "Analyze this prescription and extract the following information:\n"
                        "1. 'hospital_name': The name of the hospital, clinic, or institution.\n"
                        "2. 'doctor_name': The full name of the doctor.\n"
                        "3. 'medications': A list of all medications. Each item MUST be an object containing:\n"
                        "   - 'name': The drug name.\n"
                        "   - 'doses_time_01': A JSON list/array of strings indicating the time of day. "
                        "     (e.g., if the dose is 1-0-1, return ['morning', 'night']. If 1-1-1, return ['morning', 'noon', 'night']. If only night, return ['night']).\n"
                        "   - 'doses_time_02': The instruction regarding meals. This MUST be either 'after meal' or 'before meal'. "
                        "     **CRITICAL RULE**: If the prescription does not explicitly state 'before meal' or 'empty stomach', you MUST return 'after meal'.\n\n"
                        "Return this information *only* as a JSON object."
                    )
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{base64_image}"
                    }
                }
            ]
        }
    ]

    try:
        context.log("Sending request to OpenAI...")
        
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=prompt_messages,
            max_tokens=1000,
            temperature=0.0,
            response_format={"type": "json_object"}
        )

        json_string = response.choices[0].message.content

        if json_string.startswith("```json"):
            json_string = json_string[7:-3].strip()
        elif json_string.startswith("```"):
            json_string = json_string[3:-3].strip()

        parsed_data = json.loads(json_string)

        return context.res.json(parsed_data, 200)

    except Exception as e:
        context.error(f"OpenAI Error: {str(e)}")
        return context.res.json({
            "success": False, 
            "error": f"Failed to process image: {str(e)}"
        }, 500)