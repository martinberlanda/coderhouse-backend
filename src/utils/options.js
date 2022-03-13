import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const optionsSqlite3 = {
  client: "better-sqlite3",
  connection: {
    filename: path.resolve(__dirname, "./DB/ecommerce/ecommerce.db3"),
  },
  useNullAsDefault: true,
};

export const optionsMariaDb = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "ecommerce",
  },
};

export const urlMongoDb = "mongodb://localhost:27017/ecommerce";

export const firebaseJson = {
  type: "service_account",
  project_id: "coderhouse-backend-d2e9d",
  private_key_id: "2a471e867795cc49b12f3cd0bb4e8b183d8e3ae7",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7j1/p3H5YdtW1\n3tkK8wcyFfx+EVKasN7J/UmJzFSCb17Ya2x53A3N2/F+ib2jgbEiBtvNo+VtcYA5\nNAO1N1cS3x55m5wO7GJUlIJu7Xj7VD6bC9Z67gOlJ53XNnUvBOpOcE44jBA1qg5c\nH0wpPO3U+o1eyyyrCicw3Vcy/VhGP85Zm7oHBA/Hn6VPqZ0Ccvb7DDqtz1qmhAKF\nUrg0dJZcN/kVoo8vqotLxTqFBN4QRiQgoxlXUN25DY8dB+/oybLUn749+OJWziRI\nDEGu4Rb+t5L4EYjXXzO50/KIhiGPbmzx4QlC6CSVVtgzqKVT0LskSWCtfrZ9NmFT\nSrhOSRGVAgMBAAECggEALHl9tJpigk8hc3gVjs1cgDGq9ujcJc65cXukV67SPkCy\n5I4qgYXe5xjXnZoDVBVxf4BRWCScR1Sh406Ub4DhHpo2I3905KwEUAqMGEoqxSvv\nkXvf3rP4PM4VVT42UNExTyq9vZZm1JbPw2PvfxrRyY4k/hye6arlaqadoftllnhs\nOR/Hm8QGLqwtcKONk3Pz2tb7HsWZ4opyGM75Qf+5VSPUxHwOZLUIAmrKTi5kTJ1H\nCjttRgmZE0oV99LpZtn8V/puuEASIVCQsNxB3SFF+89u4kF5Lq4H58lUsYVWtnr7\nRACqcxrnJBpnVFOmpOge6TYW3yjEp7Nyp6pht3Uw4QKBgQDoQAOk4fKMhS28W2Mi\nRrTYvTxdMy+TLdzfmwF8sy6A49TpHmmDJ6LDHfEmX3Xl5ZohAamkES27uEixOV4d\nTRxSmER5PdIl2/OemcV/yaZYHjV/ccbbO9y/rvUdkk+9oQTuqUTNuBAsYiBzsEwj\n45Bx3kVasCtlaZQVoaSgktnKYQKBgQDOvXAfZhHwEi85V9LqUuGNJci/07EgjX+i\nmJeD0LEtACUwoqn2I1guQcoI1pYKePwnCn2Jh07UpWBWh34qIorVC3aTMUUiu1wq\n2RImck4UT36cC1uJGIr9PEyISfuotNaw6zpk3pnHULYdoftEnSHsup5DE6591MhF\n83vj0azbtQKBgGqKcyGARTQRJBn0ElX2+Z8zsC1Q/dIWh+xLvzLlP8AAw/rs6Jox\n5Ih9g9KGmB8OZNYfXSLWfpROxYoHNxVZ+lQpZb/4jB6x9+AZynAEoTprIT+FgiOw\nImQMboVSSSJEa27QV6/HcCPsH9byWPtduTWDMW2Yw0+ST0xdCphexWoBAoGBAJKx\nbGt7G2NDI+sGXAwUfyKOGuGyLc6xWE1hBLFtVSpfHgRih0K1VY6M8/RNfu0zZ4e0\nM9tv/Ql5xt/fCDCRjf0ZQyuyHCJG22Ez4WMSXEChH29Nx8eBeK2zKYLTLBRLLMMg\nRbDpGiiJJo/kLcxDypyU1lM2FewHHYw09kVys7q5AoGBANyCsIgqPkth5Nzgiaoz\nDR4TpHKhRH/Ulaps4fAbV5jx3HUz8sl6Er4LE+YVOfHRFCR3KlHoXieo14FwyMPz\n5U8oba0Osy1qwjwwpoNsoIC5JDYCT/3qgwrhwl/mtIV/50taehOfQodj5A2OIGBS\nvZlTBc7O35KP+mkm1t2FwnCP\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-l3afp@coderhouse-backend-d2e9d.iam.gserviceaccount.com",
  client_id: "112011711020717005812",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-l3afp%40coderhouse-backend-d2e9d.iam.gserviceaccount.com",
};
