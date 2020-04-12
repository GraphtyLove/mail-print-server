"""File to convert a file to jpg."""
import os
import logging
import subprocess

# * ----- Logger set-up ----- *
logger = logging.getLogger("[CONVERT SERVER]")

def convert_to_jpg(file_name: str):
    """
    Function to convert a file to jpg.

    This function is used to convert files to jpg to show a thumnail in the UI.
    :param file_path: A string with the file name of the file to convert.
    """
    thumnail_name = os.path.splitext(file_name)[0] + ".jpg"
    file_path = os.path.join("static/mail_files/", file_name)
    new_path = os.path.join("static/thumbnails/", thumnail_name)
    file_extension = os.path.splitext(file_name)[1]

    # If the file is a jpg. copy it to the thumbnail folder
    if file_extension in ['.jpg', '.jpeg']:
        try:
            subprocess.run([
                "cp",
                file_path,
                new_path
            ])
        except Exception as ex:
            logger.error("[ERROR] Error while converting to jpg:")
            logger.error(ex)

    else:
        # Try to convert the file to jpg
        try:
            subprocess.run([
                "convert",
                file_path,
                new_path
            ])
        
        except Exception as ex:
            logger.error("[ERROR] Error while converting to jpg:")
            logger.error(ex)