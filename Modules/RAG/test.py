from rag import rag_pipeline

input_json = {
    "raw": "kamptee me pani ki level kitni hai?",
    "normalized": "What is the groundwater level in Nagpur Urban?"
}

db_json = {
  "data": [
    {
      "Sl_No": 1,
      "State": "Maharashtra",
      "District": "Nagpur",
      "Assessment_Unit_Name": "Nagpur Urban",
      "Assessment_Unit_Type": "Block",
      "Recharge_Worthy_Area_Ha": 15450,
      "Total_Annual_Ground_Water_Recharge_Ham": 9850,
      "Annual_Extractable_Ground_Water_Resource_Ham": 8865,
      "Total_Ground_Water_Extraction_Ham": 7650,
      "Stage_of_Ground_Water_Extraction_Percent": 86.3,
      "Categorization": "Semi-Critical"
    }
  ]
}

response = rag_pipeline(input_json, db_json)
print(response)
