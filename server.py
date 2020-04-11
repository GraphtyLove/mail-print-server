"""API."""

import os
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import shutil
import logging

from utils.download_mail import download_mail
from utils.print_document import print_document

# * ----- Logger set-up ----- *
logging.basicConfig(
    level="INFO",
    format="%(asctime)s %(levelname)-8s %(name)-20s %(message)s",
    datefmt="%s-%m-%Y %H:%M:%S",
)
logger = logging.getLogger("[API SERVER]")


# * ---------- Create App --------- *
app = Flask(__name__)
CORS(app, support_credentials=True)


# * --------- ROUTES --------- *
@app.route('/', methods=['GET'])
def index():
    return "API online."


@app.route('/get-documents', methods=['GET'])
def get_document_route():
    documment_list = [document_name for document_name in os.listdir("mail_files") if document_name[0] != "."]
    return jsonify(documment_list)


@app.route('/delete-document/<string:document_name>', methods=['GET'])
def delete_document_doute(document_name: str):
    try:
        file_path = os.path.join("mail_files", document_name)
        os.remove(file_path)

    except FileNotFoundError as ex:
        logger.error("[ERROR] Try to delete non-existing file: ")
        logger.error(ex)
    
    except Exception as ex:
        logger.error("[ERROR] Unknow error while deleting file: ")
        logger.error(ex)
    
    documment_list = [document_name for document_name in os.listdir("mail_files") if document_name[0] != "."]
    return jsonify(documment_list)


@app.route('/print-document/<string:document_name>', methods=['GET'])
def print_document_route(document_name: str):
    document_path = os.path.join("mail_files", document_name)
    try:
        print_document(document_path)
    except Exception as ex:
        logger.error("[ERROR] Unknow error while printing: ")
        logger.error(ex)


@app.route('/rename-document/<string:document_name>&<string:document_new_name>', methods=['GET'])
def rename_document_route(document_name: str, document_new_name: str):
