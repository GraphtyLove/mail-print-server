"""File to convert a file to jpg."""
import os
import logging
import subprocess

# * ----- Logger set-up ----- *
logger = logging.getLogger("[CONVERT SERVER]")

def reduce_img_quality(image_path: str, new_path: str = None) -> None:
    """
    Function to reduce the size the image to optimize web view.
    
    :param image_path: A string with the path of the image to resize.
    :param new_path: A string with a new path if needed.
    """
    if not new_path:
        new_path = image_path
    img = Image.open(image_path)
    factor = 300
    width = factor / float(img.size[0])
    height = int((float(img.size[1]) * float(width)))
    img = img.resize((factor, height), Image.ANTIALIAS)
    img.save(new_path, "JPEG", optimize=True)


def convert_to_jpg(file_name: str):
    """
    Function to convert a file to jpg.

    This function is used to convert files to jpg to show a thumbnail in the UI.
    :param file_path: A string with the file name of the file to convert.
    """
    thumbnail_name = os.path.splitext(file_name)[0] + ".jpg"
    file_path = os.path.join("static/mail_files/", file_name)
    new_path = os.path.join("static/thumbnails/", thumbnail_name)
    file_extension = os.path.splitext(file_name)[-1]

    # If the file is a jpg. copy it to the thumbnail folder
    logger.error('FILE: ' + file_extension)
    if file_extension in ['.jpg', '.jpeg']:
        try:
            reduce_img_quality(file_path, new_path)
        except Exception as ex:
            logger.error("[ERROR] Error while resizing to jpg: ")
            logger.error(ex)

    elif file_extension in ['.png', '.tiff', '.tif', '.pdf']:
        logger.error("RED: " + file_extension)
        # Try to convert the file to jpg
        try:
            subprocess.run([
                "convert",
                f"{file_path}[0]",
                new_path
            ])
            reduce_img_quality(new_path)
        except Exception as ex:
            logger.error("[ERROR] Error while converting to jpg:")
            logger.error(ex)
