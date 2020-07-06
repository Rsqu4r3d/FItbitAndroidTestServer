package com.nanosample;

import android.util.Log;
import fi.iki.elonen.NanoHTTPD;
import java.io.IOException;



/**
 * borrowed from jens on 25.03.17.
 */
public class MyHTTPD extends NanoHTTPD {
    static final int PORT = 9013;

    MyHTTPD() throws IOException {
        super(PORT);
    }

    @Override
    public Response serve(IHTTPSession session) {
        Log.i("TAG", "serve: "+session.getUri());
        String uri = session.getUri();

        if (uri.equals("/text.text")) {
            String response = "Hello World!"; //This is the string sent to the fitbit companion app.
            return newFixedLengthResponse(response);

        }

        return  null;
    }
}