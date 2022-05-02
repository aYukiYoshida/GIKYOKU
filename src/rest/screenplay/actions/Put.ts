import { Actor } from '@testla/screenplay';
import { UseRestAPI } from '../abilities/UseRestAPI';
import { Header, Response, REQUEST_METHOD } from '../../types';
import { AbstractRequest } from './AbstractRequest';

/**
 * Action Class. Send a HTTP PUT Request.
 */
export class Put extends AbstractRequest {
    private constructor(private fullURL: string, private data?: any) {
        super();
    }

    /**
     * Send a HTTP PUT request to the specified url.
     *
     * @param actor
     */
    public async performAs(actor: Actor): Promise<Response> {
        const response = await UseRestAPI.as(actor).sendRequest(REQUEST_METHOD.PUT, this.fullURL, this.headers, this.data);

        this.response.body = response.body;
        this.response.status = response.status;
        this.response.headers = response.headers;

        return this.response;
    }

    /**
     * Send a HTTP PUT request to the specified url.
     *
     * @param fullUrl the URL of the target.
     */
    public static to(fullUrl: string): Put {
        return new Put(fullUrl);
    }

    /**
     * Add data to the HTTP PUT request to send.
     *
     * @param data the data.
     */
    public withData(data: any): Put {
        this.data = data;
        return this;
    }

    /**
     * Add headers to the HTTP PUT request to send.
     *
     * @param headers the headers.
     */
    public withHeaders(headers: Header): Put {
        this.headers = headers;
        return this;
    }

    /**
     * Save the response to this HTTP request. After the request is executed, the response to the request will be written into the function argument.
     *
     * @param response the response to the request will be written into this function argument
     */
    public andSaveResponseTo(response: Response): Put {
        this.response = response;
        return this;
    }
}
