package com.nanosample;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.TextView;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import java.io.IOException;

public class MainActivity extends AppCompatActivity {

    private static MyHTTPD server;

    private String ip;


    @Override protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        final Button btnStart = findViewById(R.id.btnStart);
        final Button btnStop = findViewById(R.id.btnStop);
        final TextView txtIpAddress = findViewById(R.id.txtIpAddress);
        final String host = getString(R.string.host);

        try {
            server = new MyHTTPD();
        } catch (IOException e) {
            e.printStackTrace();
        }

        btnStart.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View view) {
                try {
                    server.start();
                    initIPAddress();
                    txtIpAddress.setText( host + ip + ":" + MyHTTPD.PORT);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });

        btnStop.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View view) {
                server.stop();
                txtIpAddress.setText("");
            }
        });
    }
    private void initIPAddress() throws IOException {

        ip = "http://localhost/";
        //
        Log.i("TAG", "onCreate: " + ip);
    }

}
