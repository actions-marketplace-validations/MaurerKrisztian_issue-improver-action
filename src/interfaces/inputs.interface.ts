export interface IInputs {
    apiKey: string;
    githubToken: string;
    model: string;
    addRelatedIssuesSection: boolean;
    addSummarySection: boolean;
    addCustomSection: boolean;
    addLabelSection: boolean;
    addCommentSummarySection: boolean;
    maxTokens: number;
    configFile: string;
    debug: boolean;
}
