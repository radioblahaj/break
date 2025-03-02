// FOR THE RASPBERRY PI PICO

int BRAKE_PIN = 21;
int LEFT_PIN = 20;
int RIGHT_PIN = 22;

// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(BRAKE_PIN, OUTPUT);
  pinMode(LEFT_PIN, OUTPUT);
  pinMode(RIGHT_PIN, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  while (Serial.available() > 0) {
    char v = (char)Serial.read();

    if (v == 'B') {
      digitalWrite(BRAKE_PIN, false);
      Serial.println("B");
    }
    if (v == 'F') {
      digitalWrite(BRAKE_PIN, true);
      Serial.println("F");
    }
    if (v == 'L') {
      digitalWrite(LEFT_PIN, false);
      Serial.println("L");
    }
    if (v == 'R') {
      digitalWrite(RIGHT_PIN, false);
      Serial.println("R");
    }
    if (v == 'G') {
      digitalWrite(LEFT_PIN, true);
      digitalWrite(RIGHT_PIN, true);
      Serial.println("G");
    }
  }
}
