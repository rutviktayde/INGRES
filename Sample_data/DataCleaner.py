import pandas as pd

# Load your Excel file
file = r"D:\C++ project\SIH Prototype\INGRES\GWRA--2024.xlsx"

# Read the sheet (adjust sheet_name if needed)
df = pd.read_excel(file, sheet_name="2024")

# List of your numeric columns
cols = [
    "Recharge Worthy Area(Ha)",
    "Total Annual  Ground Water (Ham) Recharge",
    "Annual Extractable Ground Water Resource  (Ham)",
    "Total  Ground Water Extraction  (Ham)",
    "Stage of Ground Water  Extraction (%)"
]

# Fill NaN values in each column with its average
for col in cols:
    avg_value = df[col].mean()
    df[col].fillna(avg_value, inplace=True)

# Save back to Excel (optional, so you don’t overwrite the original)
df.to_excel(r"D:\C++ project\SIH Prototype\INGRES\GWRA--2024_filled.xlsx", index=False)

print("Null values replaced with column averages successfully!")