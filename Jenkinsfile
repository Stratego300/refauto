@Library('opt-shared-libraries') _

//Set the ID of the Ansible template Job
INT_ENV = '''{
    "OPT_AUTH_SERVER_URL" : "https://auth-qual.intranet.opt/jwt",
    "OPT_AUTH_PUBLIC_KEY_FILE_PATH" : "/opt/app/app01-refauto/files/jwt-certificate-qual.der",
    "DB_URL" : "jdbc:postgresql://dbp-refauto-int.intranet.opt/sumo?ssl=true",
    "DB_USERNAME" : "refauto_adm",
    "DB_PASSWORD" : "???",
    "SERVER_PORT" : 8080,
    "LOG_FILE" : "/var/log/app01-refauto/refauto.log",
    "MAX_HISTORY" : "2",
    "MAX_FILE_SIZE" : "1GB",
    "TOTAL_SIZE_CAP" : "100GB"
}'''.replace("\"", "\\\"").replace("\n", "")

//Utilisation d'une closure pour résoudre warUrl au runtime
def towerValue = { warUrl -> """{
                              "extra_vars": {
                                "self_war_url": "${warUrl}",
                                "self_environment":  "${INT_ENV}",
                                "self_drop_indices": "Non",
                                "self_drop_database": "Non"
                              }
                            }""" }

optJhipsterRelease ANSIBLE_ID: "???", GRADLE_TOOL: "gradle-4.10.2", towerVars : towerValue
