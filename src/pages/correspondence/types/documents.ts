
export interface OutgoingDocument {
  id: string;
  title: string;
  classification: string;
  recipient: string;
  dateSent: string;
  deadline: string;
  status: string;
  internalNumber: string;
  referenceCode: string;
  destinationUnit: string;
  releaseStatus: string;
  priority: string;
  tags: string[];
}

export interface DocumentFilter {
  classification: string;
  status: string;
  destinationUnit: string;
  releaseStatus: string;
  priority: string;
  dateFrom: string;
  dateTo: string;
}
