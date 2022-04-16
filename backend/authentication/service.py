import random
import string
import os
from tkinter import E

def generate_code():
  length = 6
  letters = string.ascii_uppercase + string.digits
  rand_string = ''.join(random.choice(letters) for i in range(length))
  return(rand_string)

def delete_old_file(file_path):
  if os.path.exists(file_path):
      os.remove(file_path)