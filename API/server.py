"""API."""

import os
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import logging

from utils.download_mail import fetch_and_dl_attachments
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
CORS(app)


# * --------- ROUTES --------- *
@app.route('/', methods=['GET'])
def index():
    return "API online."


@app.route('/fetch-mails', methods=['GET'])
def fetch_mails():
    document_list = [document_name for document_name in os.listdir("static/mail_files") if document_name[0] != "."]
    return jsonify(document_list)


@app.route('/dl-mails', methods=['GET'])
def download_mails():
    try:
        fetch_and_dl_attachments()
    except Exception as ex:
        logger.error("[ERROR] Unknow error while deleting file: ")
        logger.error(ex)

    document_list = [document_name for document_name in os.listdir("static/mail_files") if document_name[0] != "."]
    return jsonify(document_list)


@app.route('/get-documents', methods=['GET'])
def get_document_route():
    document_list = [document_name for document_name in os.listdir("static/mail_files") if document_name[0] != "."]
    return jsonify(document_list)


@app.route('/delete-document/<string:document_name>', methods=['GET'])
def delete_document_doute(document_name: str):
    try:
        file_path = os.path.join("static/mail_files", document_name)
        os.remove(file_path)

    except FileNotFoundError as ex:
        logger.error("[ERROR] Try to delete non-existing file: ")
        logger.error(ex)
    
    except Exception as ex:
        logger.error("[ERROR] Unknow error while deleting file: ")
        logger.error(ex)
    
    document_list = [document_name for document_name in os.listdir("static/mail_files") if document_name[0] != "."]
    return jsonify(document_list)


@app.route('/print-document/<string:document_name>', methods=['GET'])
def print_document_route(document_name: str):
    document_path = os.path.join("static/mail_files", document_name)
    try:
        print_document(document_path)
    except Exception as ex:
        logger.error("[ERROR] Unknow error while deleting file: ")
        logger.error(ex)
    return jsonify("OK")


# * -------------------- RUN SERVER -------------------- *
if __name__ == '__main__':
    # * --- DEBUG MODE: --- *
    app.run(host='127.0.0.1', port=5000, debug=True)
    #  * --- DOCKER PRODUCTION MODE: --- *
    # app.run(host='0.0.0.0', port=os.environ['PORT']) -> DOCKER