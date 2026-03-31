import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from urllib.parse import quote_plus

server = os.getenv("127.0.0.1,1433")
database = os.getenv("cars_db")
username = os.getenv("SA")
password = os.getenv("root_123")

connection_string = (
    "DRIVER={ODBC Driver 18 for SQL Server};"
    f"SERVER={server};"
    f"DATABASE={database};"
    f"UID={username};"
    f"PWD={password};"
    "Encrypt=yes;"
    "TrustServerCertificate=no;"
    "Connection Timeout=30;"
)

engine = create_engine(
    f"mssql+pyodbc:///?odbc_connect={quote_plus(connection_string)}"
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
