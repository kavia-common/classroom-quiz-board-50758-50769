#!/bin/bash
cd /home/kavia/workspace/code-generation/classroom-quiz-board-50758-50769/quiz_frontend_tv
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

