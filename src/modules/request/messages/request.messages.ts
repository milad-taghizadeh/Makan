export enum RequestMessages {
    FORBIDDEN_REQUEST = "you cannot access this request",
}

export enum AcceptRequestMessages {
    BADREQUEST_STATUS_CANCELED_ACCEPT_REQUEST = "this request is cancelled by user , you cannot accept this request",
    BADREQUEST_STATUS_EXPIRED_ACCEPT_REQUEST = "this request is expired and you cannot accept that again",
    BADREQUEST_STATUS_DONE_ACCEPT_REQUEST = "this request is already accepted by another agent, you cannot accept this request again"
}

export enum CancelRequestMessages {
    BADREQUEST_STATUS_CANCELED_CANCEL_REQUEST = "this request is already cancelled by user",
    BADREQUEST_STATUS_EXPIRED_CANCEL_REQUEST = "this request is already expired and you cannot cancel an expired request",
    

}