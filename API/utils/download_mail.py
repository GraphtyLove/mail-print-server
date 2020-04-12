
"""File to fetch mails and DL attachments."""
import email
import imaplib
import os
import logging

from utils.convert_jpg import convert_to_jpg

# * ----- Logger set-up ----- *
logger = logging.getLogger("[DOWNLOAD SERVER]")

# * ----- LOGIN INFO ----- *
user = os.environ.get("MAIL_USER", "")
password = os.environ.get("MAIL_PWD", "")


def fetch_and_dl_attachments() -> None:
    """Function to fetch all mails and download new attachments to folder."""
    try:
        # * ----- SERVER SETUP ----- *
        server = imaplib.IMAP4_SSL('imap.gmail.com')
        server.login(user, password)
        # * ----- GET DATA ----- *
        server.select()
        _, data = server.search(None, 'ALL')

        # * ----- LOOP THROUGHT MAILS ----- *
        for msgId in data[0].split():
            # Fetch mails
            typ, messageParts = server.fetch(msgId, '(RFC822)')
            # Get message body
            emailBody = messageParts[0][1]
            # Decode UTF-8
            raw_email_string = emailBody.decode('utf-8')
            # Format data
            mail = email.message_from_string(raw_email_string)
            # Get Subject
            email_subject = mail['subject']
            # Loop in mail emlement to get files
            for part in mail.walk():
                # Skip unwanted stuff
                if part.get_content_maintype() == 'multipart' or part.get_content_maintype() is None:
                    continue
                
                # Print mail content:
                logger.debug(part.as_string())
                
                # Get file name if there are
                file_name = part.get_filename()
                
                if file_name:
                    logger.info(f"Catched file: {file_name}")
                    # Define the path the save the file
                    file_path = os.path.join('static/mail_files', file_name)
                    # If the file doesn't already exist
                    if not os.path.isfile(file_path):
                        # Save the file
                        with open(file_path, 'wb') as f:
                            f.write(part.get_payload(decode=True))
                        logger.info(f"Downloaded file: {file_name}")
                        # Convert the file to jpg and store it in the thumbnail folder
                        convert_to_jpg(file_name)

    except Exception as ex:
        logger.error(ex)