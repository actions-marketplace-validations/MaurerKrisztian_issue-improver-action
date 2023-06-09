# issue-improver-action

![Maurer Krisztian](https://user-images.githubusercontent.com/48491140/234571713-eb6a3708-40b5-4b81-903d-7c4d0b16ccea.png)



GitHub Action that automates issue improvement suggestions using OpenAI.

## Inputs:

| Input                      | Required | Default                    | Info                                           |
|----------------------------|----------|----------------------------|------------------------------------------------|
| api-key                    | Yes      | N/A                        | OpenAI API key                                 |
| config-file                | No       | issue-improver-config.json | Configuration file                             |
| add-related-issues-section | No       | false                      | Create a related issues section.               |
| add-summary-section        | No       | false                       | Create a summary section.                      |
| add-comment-summary-section        | No       |    false                        | Create comment summary                         |
| add-custom-section         | No       |   false                         | Create custom sections                         |
| add-label-section          | No       |  false                          | Create label suggesion                         |
| model                      | No       | 'text-davinci-003'         | OpenAI model                                   |
| max_tokens                 | No       | 150                        | OpenAI max_tokens (response length)            |
| debug-mode                | No       | false                      | Enable debug mode: Show prompts in comments |


## How does It work?

Whenever an issue is created, this action can be triggered to gather the relevant issue data, use it to resolve the template prompts, and submit it to a GPT model.

E.g
- Find related issues among open issues.
- Summarize issues.

The resulting responses will then be added as a comment to the issue.

## Action example:


```yml
name: Improve issues

on:
  issues:
    types: [opened, edited]

jobs:
  gpt-comment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Create useful comment with AI
        uses: MaurerKrisztian/issue-improver-action@latest
        with:
          api-key: ${{ secrets.GPT_KEY }}
          max_tokens: 400
          add-related-issues-section: true
          add-summary-section: true
          add-label-section: true
          add-custom-section: true
```

## Comment Summary
Occasionally, certain GitHub issues can be overwhelming with an abundance of comments, making it difficult to comprehend the situation. To address this, I have developed a comment summary feature. The YAML code below demonstrates how to activate this summary using the "!summarize" command.

```yml
on:
  issue_comment:

jobs:
  comment-summary:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Comment summary
        uses: MaurerKrisztian/issue-improver-action@latest
        if: contains(github.event.comment.body, '!summarize')
        with:
          api-key: ${{ secrets.GPT_KEY }}
          max_tokens: 400
          add-comment-summary-section: true
```

## Custom section:
All section prompts is fully customisable.
To create custom sections / prompts, simply create a JSON file (location is the `config-file` input) and modify the prompts and section titles as desired. This will owerwite the default config (see: `src/config/default-config.ts`). 

Additionally, you can add new custom sections to the `sections.custom` array within the configuration file.

#### Example config:
```json
{
  "sections": {
    "custom": [
      {
        "title": "Joke",
        "prompt": "make a joke about this: {{issueTitle}}"
      },
      {
        "title": "Poem",
        "prompt": "Write a short poem about this: {{issueTitle}}"
      }
    ],
    "relatedIssues": {
      "title": "Related Issues",
      "prompt": "From the list of open issues: {{openIssues}}, identify the most relevant ones related to '{{issueTitle}}' and provide a brief description of their similarities. Just the very simmilar related issues to '{{issueTitle}}' shoud be included in the answer, if none is very similar, andwer with 'none',"
    },
    "summary": {
      "title": "Summary",
      "prompt": "Provide a concise summary of the main points and objectives presented in the issue '{{issueTitle}}' and its content: {{issueBody}}."
    },
    "commentSummary": {
      "title": "Comment summary",
      "prompt": "Review the comments in {{issueComments}} for the issue '{{issueTitle}}' and its content: {{issueBody}}. Extract the key takeaways, notable updates, and any consensus reached, and provide a concise summary of the discussion."
    },
    "labelSuggestion": {
      "title": "Label Suggestion",
      "prompt": "Analyze the issue '{{issueTitle}}' and its content: {{issueBody}}, and suggest appropriate labels from the available labels {{allLabels}} that accurately represent the topic, scope, and complexity of the issue. The response shoud only include a label and why its suitable."
    }
  }
}
```

## Demo:


![image](https://user-images.githubusercontent.com/48491140/235365172-05f4a8ec-04bc-4d77-96d6-cb71237e0fc6.png)
![image](https://user-images.githubusercontent.com/48491140/235365094-ac4dfa90-36fe-45b1-9ed9-a5d3daa7160a.png)


## Comment summary demo:

![image](https://user-images.githubusercontent.com/48491140/235367263-58f9fccb-8053-4a38-809d-d1b01e09b18f.png)
![image](https://user-images.githubusercontent.com/48491140/235367300-18042502-bfcc-4b74-8354-ad4c65278bdb.png)
![image](https://user-images.githubusercontent.com/48491140/235367317-13c759d5-a5c0-4b0e-bf63-78ef581e5ed3.png)


