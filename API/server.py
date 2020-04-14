"""API."""

import os
import logging
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from typing import Optional, List

from utils.download_mail import fetch_and_dl_attachments
from utils.print_document import print_document
from utils.convert_jpg import convert_to_jpg


# * ----- Logger set-up ----- *
logging.basicConfig(
    level="INFO",
    format="%(asctime)s %(levelname)-8s %(name)-20s %(message)s",
    datefmt="%s-%m-%Y %H:%M:%S",
)
logger = logging.getLogger("[API SERVER]")


# * ---------- Create App --------- *
app = Flask(__name__)
CORS(app)

def get_documents_from_folder(folder_name: str) -> Optional[List[str]]:
    """Function that return the file names of the files in a folder."""
    return [document_name for document_name in os.listdir(f"static/{folder_name}") if document_name[0] != "."]


# * --------- ROUTES --------- *
@app.route('/', methods=['GET'])
def index():
    return "API online."


@app.route('/fetch-documents', methods=['GET'])
def fetch_mails():
    documents: dict = {
        "mails":  get_documents_from_folder("mail_files"),
        "uploads": get_documents_from_folder("upload_files")
    }
    return jsonify(documents)


@app.route('/dl-mails', methods=['GET'])
def download_mails():
    try:
        fetch_and_dl_attachments()
    except Exception as ex:
        logger.error("[ERROR] Unknown error while deleting file: ")
        logger.error(ex)

    documents: dict = {
        "mails": get_documents_from_folder("mail_files"),
        "uploads": get_documents_from_folder("upload_files")
    }
    return jsonify(documents)


@app.route('/delete-document/<string:document_folder>/<string:document_name>', methods=['GET'])
def delete_documen(document_folder: str, document_name: str):
    try:
        file_path = os.path.join(f"static/{document_folder}", document_name)
        os.remove(file_path)

    except FileNotFoundError as ex:
        logger.error("[ERROR] Try to delete non-existing file: ")
        logger.error(ex)
    
    except Exception as ex:
        logger.error("[ERROR] Unknown error while deleting file: ")
        logger.error(ex)

    documents: dict = {
        "mails": get_documents_from_folder("mail_files"),
        "uploads": get_documents_from_folder("upload_files")
    }
    return jsonify(documents)


@app.route('/print-document/<string:file_folder>/<string:document_name>', methods=['GET'])
def print_document_route(file_folder: str, document_name: str):
    
    document_path = os.path.join(f"static/{file_folder}", document_name)
    
    try:
        print_document(document_path)
    except Exception as ex:
        logger.error("[ERROR] Unknown error while deleting file: ")
        logger.error(ex)
    return jsonify("OK")



@app.route('/upload-documents', methods=['GET', 'POST'])
def upload_documents():
    response = "error"
    file = request.files['file']
    if request.method == 'POST' and file.filename != '':
        if file:
            new_path = os.path.join("static/upload_files", file.filename)
            file.save(new_path)
            convert_to_jpg("upload_files", file.filename)
            response = 'success'
    return jsonify(response)


# * -------------------- RUN SERVER -------------------- *
if __name__ == '__main__':
    # * --- DEBUG MODE: --- *
    app.run(host='0.0.0.0', debug=True)
    #  * --- DOCKER PRODUCTION MODE: --- *
    # app.run(host='213.189.172.207', port=os.environ['PORT']) -> DOCKER