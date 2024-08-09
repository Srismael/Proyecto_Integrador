#include <WiFi.h>
#include <HTTPClient.h>
#include <SPI.h>
#include <MFRC522.h>

// Configuración del WiFi
const char* ssid = "ISIMAC-f78Z";
const char* password = "96xwsNAX";

// Configuración del servidor (reemplaza con la IP de tu servidor Flask)
const char* serverName = "http://192.168.18.6:5000/actualizar_asistencia";

// Configuración del RFID
#define SS_PIN 5
#define RST_PIN 2

MFRC522 rfid(SS_PIN, RST_PIN); // Instancia de la clase
MFRC522::MIFARE_Key key; 

// Array que almacenará el nuevo NUID 
byte nuidPICC[4];

void setup() { 
  Serial.begin(9600);
  SPI.begin(); // Inicializar bus SPI
  rfid.PCD_Init(); // Inicializar MFRC522 

  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  }

  Serial.println("Iniciando...");

  // Conectar al WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando al WiFi...");
  }
  Serial.println("Conectado al WiFi");
}
 
void loop() {
  // Reiniciar el bucle si no hay una nueva tarjeta presente en el sensor/lector. Esto ahorra el proceso completo cuando está inactivo.
  if (!rfid.PICC_IsNewCardPresent())
    return;

  // Verificar si el NUID ha sido leído
  if (!rfid.PICC_ReadCardSerial())
    return;

  Serial.print(F("Tipo de PICC: "));
  MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
  Serial.println(rfid.PICC_GetTypeName(piccType));

  // Verificar si el PICC es del tipo MIFARE Classic
  if (piccType != MFRC522::PICC_TYPE_MIFARE_MINI &&  
      piccType != MFRC522::PICC_TYPE_MIFARE_1K &&
      piccType != MFRC522::PICC_TYPE_MIFARE_4K) {
    Serial.println(F("Tu etiqueta no es del tipo MIFARE Classic."));
    return;
  }

  if (rfid.uid.uidByte[0] != nuidPICC[0] || 
      rfid.uid.uidByte[1] != nuidPICC[1] || 
      rfid.uid.uidByte[2] != nuidPICC[2] || 
      rfid.uid.uidByte[3] != nuidPICC[3]) {
    Serial.println(F("Se ha detectado una nueva tarjeta."));

    // Almacenar NUID en el array nuidPICC
    for (byte i = 0; i < 4; i++) {
      nuidPICC[i] = rfid.uid.uidByte[i];
    }
   
    Serial.println(F("El NUID de la etiqueta es:"));
    Serial.print(F("En hex: "));
    printHex(rfid.uid.uidByte, rfid.uid.size);
    Serial.println();
    Serial.print(F("En dec: "));
    printDec(rfid.uid.uidByte, rfid.uid.size);
    Serial.println();

    // Enviar solicitud POST con el UID
    sendPostRequest(nuidPICC, rfid.uid.size);
  } else {
    Serial.println(F("Tarjeta leída previamente."));
  }

  // Detener PICC
  rfid.PICC_HaltA();
  // Detener la encriptación en PCD
  rfid.PCD_StopCrypto1();
}

void sendPostRequest(byte *uid, byte uidSize) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    String uidString = "";
    for (byte i = 0; i < uidSize; i++) {
      uidString += String(uid[i] < 0x10 ? "0" : "");
      uidString += String(uid[i], HEX);
    }
    uidString.toUpperCase();

    String httpRequestData = "uid=" + uidString;
    int httpResponseCode = http.POST(httpRequestData);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);
      Serial.println("Usuario registrado: " + uidString);
    } else {
      Serial.print("Error en la petición POST: ");
      Serial.println(httpResponseCode);
      Serial.println("Error en el registro");
    }
    http.end();
  } else {
    Serial.println("Error en la conexión WiFi");
    Serial.println("Error de WiFi");
  }
}

/**
 * Función auxiliar para volcar un array de bytes como valores hexadecimales en Serial. 
 */
void printHex(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], HEX);
  }
}

/**
 * Función auxiliar para volcar un array de bytes como valores decimales en Serial.
 */
void printDec(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(' ');
    Serial.print(buffer[i], DEC);
  }
}
