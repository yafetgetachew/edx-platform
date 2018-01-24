#!/bin/bash

while read line
do
    echo -e "TRANSFER PROGRESS FOR COURSES $line ...\n"
    ./manage.py lms transfer_progress $line --settings=aws
done < "$1"
