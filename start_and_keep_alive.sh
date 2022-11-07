#!/bin/bash

while (true) do
   yarn dev

   # show result
   exitcode=$?
   echo "exit code of command is $exitcode"
done
