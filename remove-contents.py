#!/usr/bin/python3
from sys import argv
with open(argv[-2]) as file1, open(argv[-1]) as file2:
    contents_a = file1.read()
    contents_b = file2.read()
with open(argv[-1], "w") as file2:
    file2.write(contents_b.replace(contents_a.strip(), ''))
