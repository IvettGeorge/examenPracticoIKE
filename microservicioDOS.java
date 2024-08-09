import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class microservicioDOS {
    public static void main(String[] args) {
        String nombre = "Bibiana Ivett George Juarez";

        try {
            String baseUrl = "http://example.com/api"; 
            String urlConParametro = baseUrl + "?name=" + nombre.replace(" ", "%20");

            URL url = new URL(urlConParametro);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            int codigoRespuesta = connection.getResponseCode();

            if (codigoRespuesta == 302) {
                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String inputLine;
                StringBuffer response = new StringBuffer();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();

                String output = response.toString();

                String[] partes = output.split("\"name\":\"");
                if (partes.length > 1) {
                    String[] subPartes = partes[1].split("\"");
                    String nombreExtraido = subPartes[0];
                    System.out.println("Nombre encontrado: " + nombreExtraido);
                } else {
                    System.out.println("Nombre no encontrado");
                }
            } else if (codigoRespuesta == 404) {
                System.out.println("Sin resultados.");
            } else {
                System.out.println("Respuesta inesperada: " + codigoRespuesta);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
