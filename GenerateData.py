import tkinter as tk
from tkinter import filedialog
import random
import bcrypt
from datetime import datetime

# Listes étendues de prénoms et noms existants
first_names = [
    "Alice", "Bob", "Charlie", "David", "Eva", "Fiona", "George", "Hannah", "Ian", "Julia", "Kevin", "Laura", "Michael", 
    "Nina", "Oscar", "Paula", "Quentin", "Rachel", "Sam", "Tina", "Ursula", "Victor", "Wendy", "Xavier", "Yvonne", "Zach",
    "Aiden", "Bella", "Caleb", "Diana", "Ethan", "Faith", "Gavin", "Hailey", "Isaac", "Jasmine", "Kyle", "Liam", 
    "Megan", "Noah", "Olivia", "Peyton", "Quincy", "Rebecca", "Steven", "Tracy", "Uma", "Vincent", "Willow", "Xander", 
    "Yara", "Zane"
]

last_names = [
    "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", 
    "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", 
    "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "King", "Wright", "Scott", "Green", "Adams", 
    "Baker", "Gonzalez", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", 
    "Evans", "Edwards", "Collins", "Stewart", "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", 
    "Murphy", "Bailey", "Rivera", "Cooper", "Richardson", "Cox", "Howard", "Ward", "Torres", "Peterson", "Gray", 
    "Ramirez", "James", "Watson", "Brooks", "Kelly", "Sanders", "Price", "Bennett", "Wood", "Barnes", "Ross", "Henderson", 
    "Coleman", "Jenkins", "Perry", "Powell", "Long", "Patterson", "Hughes", "Flores", "Washington", "Butler", "Simmons", 
    "Foster", "Gonzales", "Bryant", "Alexander", "Russell", "Griffin", "Diaz", "Hayes"
]

channel_names = [
    "NebulaNest", "OrbitOdyssey", "MysticVoyager", "QuantumLeap", "EchoesOfSpace", "PixelPioneers", "NeonNexus", 
    "CosmicCanvas", "DigitalDrift", "VirtualVistas", "PhantomFrequencies", "AstralArtists", "StarlightSymphony", 
    "QuantumQuirks", "GalacticGraffiti", "RetroRelics", "SonicSpirals", "NovaNetwork", "CelestialCinema", "EtherEchoes", 
    "DragonJuice", 'Militec', 'Celestium','Saharach', 'Frigost', 'Celestiud','Duckyland','PosticheLu','Washall','Mordor','Coca',
    'Light','Jelly','Otomai','Sufokia','Amakna','Cawotte','Pandala','Sunlight'
]

channel_second_names = [
    "Nest", "Odyssey", "Voyager", "Leap", "Space", "Pioneers", "Nexus", "Canvas", "Drift", "Vistas", "Frequencies", 
    "Artists", "Symphony", "Quirks", "Graffiti", "Relics", "Spirals", "Network", "Cinema", "Echoes"
]

# Liste de mots aléatoires pour les messages
random_words = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", 
    "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", 
    "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat", 
    "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", 
    "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", 
    "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
]

random_job_titles = [
    "Cuisinier", "Informaticien", "PDG", "Boss", "Serveur", "Administrateur réseau", "Comptable", "Secrétaire",
    "Plombier", "Policier", "Gendarme", "Intervenant", "Professeur", "Directeur"
]

unique_emails = set()
unique_channel_names = set()
person_info = {}

# Fonctions pour générer des valeurs
def generate_first_name():
    return random.choice(first_names)

def generate_last_name():
    return random.choice(last_names)

def generate_boolean():
    return random.choice([0, 1])

def generate_email(first_name, last_name, domain="stagiairesmns.fr"):
    email = f"{first_name.lower()}.{last_name.lower()}@{domain}"
    while email in unique_emails:
        email = f"{first_name.lower()}.{last_name.lower()}{random.randint(1, 100)}@{domain}"
    unique_emails.add(email)
    return email

def generate_password():
    password = random.choice(channel_names)
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    return hashed_password

def generate_specific_password():
    password = "string"
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    return hashed_password

def generate_phone_number():
    return ''.join([str(random.randint(0, 9)) for _ in range(10)])

def generate_profile_picture_path():
    base_path = '/Image/ProfilePicture/bald_icon_'
    options = ['111', '157','160','164','191','217','26','264','267','27','277','278','28','284','288','302','32','341','391','4','401','411','425','43','436','447','461','488','515','52','521','546','549','588','591','595','607','628','661','688','708','72','742']
    return base_path + random.choice(options) + ".png"

def generate_job_title_id():
    return random.randint(1, len(random_job_titles))

def generate_statut_id():
    return random.randint(1, 5)

def generate_role_id():
    return 1 if random.random() < 0.9 else 2

def generate_channel_image_path():
    base_path = '/Image/ChannelPicture/Channl_Picture_'
    option = random.randint(1, 23)
    return base_path + str(option) + ".jpg"

def generate_random_message(length=10):
    return ' '.join(random.choice(random_words) for _ in range(length))

def generate_channelpersonrole_data():
    return [
        "INSERT INTO `channelpersonrole` (`ChannelPersonRole_Id`, `ChannelPersonRole_Name`) VALUES (1, 'Utilisateur');",
        "INSERT INTO `channelpersonrole` (`ChannelPersonRole_Id`, `ChannelPersonRole_Name`) VALUES (2, 'Administrateur');"
    ]

def generate_channeltype_data():
    return [
        "INSERT INTO `channeltype` (`ChannelType_Id`, `ChannelType_Name`) VALUES (1, 'discussion privée');",
        "INSERT INTO `channeltype` (`ChannelType_Id`, `ChannelType_Name`) VALUES (2, 'discussion de groupe');"
    ]

def generate_personjobtitle_data():
    sql_commands = []
    for i, job_title_name in enumerate(random_job_titles, start=1):
        sql_commands.append(f"INSERT INTO `personjobtitle` (`PersonJobTitle_Id`, `PersonJobTitle_Name`) VALUES ({i}, '{job_title_name}');")
    return sql_commands

def generate_personrole_data():
    return [
        "INSERT INTO `personrole` (`PersonRole_Id`, `PersonRole_Name`) VALUES (1, 'Utilisateur');",
        "INSERT INTO `personrole` (`PersonRole_Id`, `PersonRole_Name`) VALUES (2, 'Administrateur');"
    ]

def generate_personstatut_data():
    return [
        "INSERT INTO `personstatut` (`PersonStatut_Id`, `PersonStatut_Name`) VALUES (1, 'Hors ligne');",
        "INSERT INTO `personstatut` (`PersonStatut_Id`, `PersonStatut_Name`) VALUES (2, 'Actif');",
        "INSERT INTO `personstatut` (`PersonStatut_Id`, `PersonStatut_Name`) VALUES (3, 'Inactif');",
        "INSERT INTO `personstatut` (`PersonStatut_Id`, `PersonStatut_Name`) VALUES (4, 'Occupé');",
        "INSERT INTO `personstatut` (`PersonStatut_Id`, `PersonStatut_Name`) VALUES (5, 'En ligne');"
    ]

def generate_channel_data(start_id, num_records, person_ids):
    sql_commands = []
    channel_ids = []
    personxchannel_sql_commands = []
    channelpersonrolexpersonxchannel_sql_commands = []
    notification_sql_commands = []
    personxnotification_sql_commands = []
    message_sql_commands = []
    personxmessage_sql_commands = []
    
    for i in range(start_id, start_id + num_records):
        channel_name = random.choice(channel_names) + random.choice(channel_second_names)
        while channel_name in unique_channel_names:
            channel_name = random.choice(channel_names) + random.choice(channel_second_names)
        unique_channel_names.add(channel_name)
        
        channel_image_path = generate_channel_image_path()
        num_people = random.randint(2, 10)
        channel_type_id = 1 if num_people == 2 else 2
        sql_command = f'''
            INSERT INTO `channel` (`Channel_ID`, `Channel_Name`, `Channel_ImagePath`, `ChannelType_Id`) 
            VALUES ({i}, '{channel_name}', '{channel_image_path}', {channel_type_id});
        '''
        sql_commands.append(sql_command.strip())
        channel_ids.append(i)
        
        selected_persons = random.sample(person_ids, num_people)
        creator_id = selected_persons[0]
        for person_id in selected_persons:
            sign_in_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            personxchannel_sql_commands.append(f'''
                INSERT INTO `personxchannel` (`Person_Id`, `Channel_ID`, `PersonXChannel_SignInDate`) 
                VALUES ({person_id}, {i}, '{sign_in_date}');
            '''.strip())
        
        admin_person_id = random.choice(selected_persons)
        for person_id in selected_persons:
            role_id = 2 if person_id == admin_person_id else 1
            affect_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            channelpersonrolexpersonxchannel_sql_commands.append(f'''
                INSERT INTO `channelpersonrolexpersonxchannel` (`Person_Id`, `Channel_ID`, `ChannelPersonRole_Id`, `ChannelPersonRoleXPersonXChannel_AffectDate`) 
                VALUES ({person_id}, {i}, {role_id}, '{affect_date}');
            '''.strip())
        
        notification_id = i 
        creator_name = f"{person_info[creator_id]['first_name']} {person_info[creator_id]['last_name']}"
        notification_text = f"Vous avez été invité à rejoindre le channel {channel_name} de la part de {creator_name}."
        notification_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        notification_sql_commands.append(f'''
            INSERT INTO `notification` (`Notification_Id`, `Notification_Name`, `Notification_Text`, `Notification_DatePost`, `Notification_Type_ID`) 
            VALUES ({notification_id}, 'Invitation', '{notification_text}', '{notification_date}', 1);
        '''.strip())
        
        for person_id in selected_persons:
            if person_id != creator_id:
                personxnotification_sql_commands.append(f'''
                    INSERT INTO `personxnotification` (`Person_Id`, `Notification_Id`, `PersonXNotification_ReadDate`) 
                    VALUES ({person_id}, {notification_id}, NULL);
                '''.strip())

    return (sql_commands, channel_ids, personxchannel_sql_commands, 
            channelpersonrolexpersonxchannel_sql_commands, notification_sql_commands, 
            personxnotification_sql_commands)

def generate_message_data(start_id, num_records, channel_ids, person_ids):
    sql_commands = []
    message_ids = []
    
    for i in range(start_id, start_id + num_records):
        channel_id = random.choice(channel_ids)
        person_id = random.choice(person_ids)
        message_text = generate_random_message()
        message_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        sql_command = f'''
            INSERT INTO `message` (`Message_ID`, `Message_Text`, `Message_Date`, `Message_HasAttachment`, `Channel_ID`, `Person_Id`) 
            VALUES ({i}, '{message_text}', '{message_date}', 0, {channel_id}, {person_id});
        '''
        sql_commands.append(sql_command.strip())
        message_ids.append(i)
    
    return sql_commands, message_ids

def generate_person_data(start_id, num_records):
    sql_commands = []
    person_ids = []

    florent_password = generate_specific_password()
    florent_email = "florent.bernar@outlook.fr"
    florent_first_name = "Florent"
    florent_last_name = "Bernar"
    florent_phone_number = generate_phone_number()
    florent_profile_picture_path = generate_profile_picture_path()
    florent_created_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    florent_is_temporary_password = generate_boolean()
    florent_job_title_id = generate_job_title_id()
    florent_statut_id = generate_statut_id()
    florent_role_id = 2  

    sql_command = f'''
        INSERT INTO `person` (`Person_Id`, `Person_Password`, `Person_Email`, `Person_PhoneNumber`, `Person_FirstName`, `Person_LastName`, `Person_CreatedTimePerson`, `Person_ProfilPicturePath`, `Person_Description`, `Person_IsTemporaryPassword`, `PersonJobTitle_Id`, `PersonStatut_Id`, `PersonRole_Id`) 
        VALUES ({start_id}, '{florent_password}', '{florent_email}', '{florent_phone_number}', '{florent_first_name}', '{florent_last_name}', '{florent_created_time}', '{florent_profile_picture_path}', 'Bonjour, je suis {florent_first_name} {florent_last_name}, je suis administrateur sur Quackers', '{florent_is_temporary_password}', '{florent_job_title_id}', '{florent_statut_id}', '{florent_role_id}');
    '''
    sql_commands.append(sql_command.strip())
    person_ids.append(start_id)
    person_info[start_id] = {
        "first_name": florent_first_name,
        "last_name": florent_last_name
    }
    
    for i in range(start_id + 1, start_id + num_records):
        password = generate_password()
        first_name = generate_first_name()
        last_name = generate_last_name()
        email = generate_email(first_name, last_name)
        phone_number = generate_phone_number()
        profile_picture_path = generate_profile_picture_path()
        created_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        is_temporary_password = generate_boolean()
        job_title_id = generate_job_title_id()
        statut_id = generate_statut_id()
        role_id = generate_role_id()

        sql_command = f'''
            INSERT INTO `person` (`Person_Id`, `Person_Password`, `Person_Email`, `Person_PhoneNumber`, `Person_FirstName`, `Person_LastName`, `Person_CreatedTimePerson`, `Person_ProfilPicturePath`, `Person_Description`, `Person_IsTemporaryPassword`, `PersonJobTitle_Id`, `PersonStatut_Id`, `PersonRole_Id`) 
            VALUES ({i}, '{password}', '{email}', '{phone_number}', '{first_name}', '{last_name}', '{created_time}', '{profile_picture_path}', 'Bonjour, je suis {first_name} {last_name}, je suis nouveau sur Quackers', '{is_temporary_password}', '{job_title_id}', '{statut_id}', '{role_id}');
        '''
        sql_commands.append(sql_command.strip())
        person_ids.append(i)
        person_info[i] = {
            "first_name": first_name,
            "last_name": last_name
        }

    return sql_commands, person_ids

def generate_personxmessage_data(person_ids, message_ids, num_records):
    sql_commands = []
    for _ in range(num_records):
        person_id = random.choice(person_ids)
        message_id = random.choice(message_ids)
        read_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        is_read = generate_boolean()
        sql_command = f'''
            INSERT INTO `personxmessage` (`Person_Id`, `Message_ID`, `PersonXMessage_ReadDate`, `isRead`) 
            VALUES ({person_id}, {message_id}, '{read_date}', {is_read});
        '''
        sql_commands.append(sql_command.strip())
    return sql_commands

def display_data():
    num_person_records = int(entry_num_person_records.get())
    num_channel_records = int(entry_num_channel_records.get())
    num_message_records = int(entry_num_message_records.get())
    num_personxmessage_records = int(entry_num_personxmessage_records.get())
    
    person_sql_commands, person_ids = generate_person_data(1, num_person_records)
    (channel_sql_commands, channel_ids, personxchannel_sql_commands, 
     channelpersonrolexpersonxchannel_sql_commands, notification_sql_commands, 
     personxnotification_sql_commands) = generate_channel_data(1, num_channel_records, person_ids)
    
    message_sql_commands, message_ids = generate_message_data(1, num_message_records, channel_ids, person_ids)
    
    personxmessage_sql_commands = generate_personxmessage_data(person_ids, message_ids, num_personxmessage_records)
    
    other_sql_commands = (
        generate_channelpersonrole_data() + 
        generate_channeltype_data() + 
        generate_personjobtitle_data() + 
        generate_personrole_data() + 
        generate_personstatut_data() +
        ["INSERT INTO `notification_type` (`Notification_Type_ID`, `NotificationType_Name`) VALUES (1, 'Invitation à un Channel');"]
    )
    
    all_sql_commands = (
        other_sql_commands + 
        person_sql_commands + 
        channel_sql_commands + 
        personxchannel_sql_commands + 
        channelpersonrolexpersonxchannel_sql_commands + 
        notification_sql_commands + 
        personxnotification_sql_commands +
        message_sql_commands +
        personxmessage_sql_commands
    )
    
    for command in all_sql_commands:
        listbox.insert(tk.END, command)

def save_to_file():
    num_person_records = int(entry_num_person_records.get())
    num_channel_records = int(entry_num_channel_records.get())
    num_message_records = int(entry_num_message_records.get())
    num_personxmessage_records = int(entry_num_personxmessage_records.get())
    
    person_sql_commands, person_ids = generate_person_data(1, num_person_records)
    (channel_sql_commands, channel_ids, personxchannel_sql_commands, 
     channelpersonrolexpersonxchannel_sql_commands, notification_sql_commands, 
     personxnotification_sql_commands) = generate_channel_data(1, num_channel_records, person_ids)
    
    message_sql_commands, message_ids = generate_message_data(1, num_message_records, channel_ids, person_ids)
    
    personxmessage_sql_commands = generate_personxmessage_data(person_ids, message_ids, num_personxmessage_records)
    
    other_sql_commands = (
        generate_channelpersonrole_data() + 
        generate_channeltype_data() + 
        generate_personjobtitle_data() + 
        generate_personrole_data() + 
        generate_personstatut_data() +
        ["INSERT INTO `notification_type` (`Notification_Type_ID`, `NotificationType_Name`) VALUES (1, 'Invitation à un Channel');"]
    )
    
    all_sql_commands = (
        other_sql_commands + 
        person_sql_commands + 
        channel_sql_commands + 
        personxchannel_sql_commands + 
        channelpersonrolexpersonxchannel_sql_commands + 
        notification_sql_commands + 
        personxnotification_sql_commands +
        message_sql_commands +
        personxmessage_sql_commands
    )
    
    file_path = filedialog.asksaveasfilename(defaultextension=".txt", filetypes=[("Text files", "*.txt"), ("All files", "*.*")])
    
    if file_path:
        with open(file_path, 'w') as file:
            for command in all_sql_commands:
                file.write(command + "\n")

root = tk.Tk()
root.title("Générateur de Commandes SQL")

label_num_person_records = tk.Label(root, text="Nombre d'enregistrements pour la table `person`:")
label_num_person_records.pack()
entry_num_person_records = tk.Entry(root)
entry_num_person_records.pack()

label_num_channel_records = tk.Label(root, text="Nombre d'enregistrements pour la table `channel`:")
label_num_channel_records.pack()
entry_num_channel_records = tk.Entry(root)
entry_num_channel_records.pack()

label_num_message_records = tk.Label(root, text="Nombre d'enregistrements pour la table `message`:")
label_num_message_records.pack()
entry_num_message_records = tk.Entry(root)
entry_num_message_records.pack()

label_num_personxmessage_records = tk.Label(root, text="Nombre d'enregistrements pour la table `personxmessage`:")
label_num_personxmessage_records.pack()
entry_num_personxmessage_records = tk.Entry(root)
entry_num_personxmessage_records.pack()

button_generate = tk.Button(root, text="Générer", command=display_data)
button_generate.pack()

button_save = tk.Button(root, text="Sauvegarder dans un fichier", command=save_to_file)
button_save.pack()

listbox = tk.Listbox(root, width=100, height=20)
listbox.pack()

root.mainloop()
