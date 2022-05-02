import { Actor } from '@testla/screenplay';
import { UseRestAPI } from '../abilities/UseRestAPI';
import { Header, Response, REQUEST_METHOD } from '../../types';
import { AbstractRequest } from './AbstractRequest';

/**
 * Action Class. Send a HTTP DELETE Request.
 */
export class Delete extends AbstractRequest {
    private constructor(private fullURL: string, private data?: any) {
        super();
    }

    /**
     * Send a HTTP DELETE request to the specified url.
     *
     * @param actor
     */
    public async performAs(actor: Actor): Promise<Response> {
        const response = await UseRestAPI.as(actor).sendRequest(REQUEST_METHOD.DELETE, this.fullURL, this.headers, this.data);

        this.response.body = response.body;
        this.response.status = response.status;
        this.response.headers = response.headers;

        return this.response;
    }

    /**
     * Send a HTTP DELETE request to the specified url.
     *
     * @param fullUrl the URL of the target.
     */
    public static from(fullUrl: string): Delete {
        return new Delete(fullUrl);
    }

    /**
     * Add data to the HTTP DELETE request to send.
     *
     * @param data the data.
     */
    public withData(data: any): Delete {
        this.data = data;
        return this;
    }

    /**
     * Add headers to the HTTP DELETE request to send.
     *
     * @param headers the headers.
     */
    public withHeaders(headers: Header): Delete {
        this.headers = headers;
        return this;
    }

    /**
     * Save the response to this HTTP request. After the request is executed, the response to the request will be written into the function argument.
     *
     * @param response the response to the request will be written into this function argument
     */
    public andSaveResponseTo(response: Response): Delete {
        this.response = response;
        return this;
    }
}
