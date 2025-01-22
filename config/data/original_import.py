import psycopg2
import json

# Database connection
conn = psycopg2.connect(
    host="ep-flat-band-a2o42iq0.eu-central-1.aws.neon.tech",
    database="invoice_app",
    user="Filip-db_owner",
    password="ty0hPCjG8wpQ"
)
cursor = conn.cursor()

# Load JSON data
with open("data.json", "r") as file:
    data = json.load(file)

# Insert data into tables
for invoice in data:
    # Insert into Invoices
    cursor.execute("""
        INSERT INTO invoices (
            invoice_id, created_at, payment_due, description, payment_terms, 
            client_name, client_email, status, sender_street, sender_city, 
            sender_postcode, sender_country, client_street, client_city, 
            client_postcode, client_country, total
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        invoice["id"], invoice["createdAt"], invoice["paymentDue"], invoice["description"], invoice["paymentTerms"], 
        invoice["clientName"], invoice["clientEmail"], invoice["status"], 
        invoice["senderAddress"]["street"], invoice["senderAddress"]["city"], 
        invoice["senderAddress"]["postCode"], invoice["senderAddress"]["country"], 
        invoice["clientAddress"]["street"], invoice["clientAddress"]["city"], 
        invoice["clientAddress"]["postCode"], invoice["clientAddress"]["country"], 
        invoice["total"]
    ))

    # Insert items into Invoice_Items
    for item in invoice["items"]:
        cursor.execute("""
            INSERT INTO invoice_items (
                invoice_id, name, quantity, price, total
            ) VALUES (%s, %s, %s, %s, %s)
        """, (
            invoice["id"], item["name"], item["quantity"], item["price"], item["total"]
        ))

# Commit changes and close the connection
conn.commit()
cursor.close()
conn.close()
