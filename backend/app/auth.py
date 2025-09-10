# backend/app/auth.py
import firebase_admin
from firebase_admin import credentials, auth
from firebase_admin import firestore as admin_firestore
from fastapi import Depends, HTTPException, Header
from typing import Optional

# Initialize Firebase Admin SDK once
if not firebase_admin._apps:
    cred = credentials.Certificate("firebase-service-account.json")
    firebase_admin.initialize_app(cred)

db = admin_firestore.client()

async def get_current_user(authorization: Optional[str] = Header(None)):
    """
    Extracts Firebase ID token from Authorization header
    and verifies the user.
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")

    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise ValueError("Invalid auth scheme")
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid Authorization header format")

    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token  # contains uid, email, etc.
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
