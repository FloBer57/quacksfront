import tkinter as tk
from tkinter import ttk, filedialog
import random
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
    "NebulaNest", "OrbitOdyssey", "MysticVoyager", "QuantumLeap", "EchoesOfSpace", "PixelPioneers", "NeonNexus", 
    "CosmicCanvas", "DigitalDrift", "VirtualVistas", "PhantomFrequencies", "AstralArtists", "StarlightSymphony", 
    "QuantumQuirks", "GalacticGraffiti", "RetroRelics", "SonicSpirals", "NovaNetwork", "CelestialCinema", "EtherEchoes", 
    "DragonJuice", 'Militec', 'Celestium','Saharach', 'Frigost', 'Celestiud','Duckyland','PosticheLu','Washall','Mordor','Coca',
    'Light','Jelly','Otomai','Sufokia','Amakna','Cawotte','Pandala','Sunlight'
]

# Fonction pour générer un prénom
def generate_first_name():
    return random.choice(first_names)

# Fonction pour générer un nom
def generate_last_name():
    return random.choice(last_names)

# Fonction pour générer un booléen (0 ou 1)
def generate_boolean():
    return random.choice([0, 1])

# Fonction pour générer un e-mail
def generate_email(first_name, last_name, domain="stagiairesmns.fr"):
    return f"{first_name.lower()}.{last_name.lower()}@{domain}"

# Fonction pour générer un numéro de téléphone
def generate_phone_number():
    return ''.join([str(random.randint(0, 9)) for _ in range(10)])

# Fonction pour générer un chemin de photo de profil
def generate_profile_picture_path():
    base_path = '/Image/ProfilePicture/bald_icon_'
    options = ['111', '157','160','164','191','217','26','264','267','27','277','278','28','284','288','302','32','341','391','4','401','411','425','43','436','447','461','488','515','52','521','546','549','588','591','595','607','628','661','688','708','72','742']
    return base_path + random.choice(options)

# Fonction pour générer un identifiant de titre de travail
def generate_job_title_id():
    return random.randint(1, 15)

# Fonction pour générer un identifiant de statut
def generate_statut_id():
    return random.randint(1, 5)

def generate_passwords():
    password = b'GeekPassword'
    # Adding the salt to password
    salt = 'string'
    # Hashing the password
    hashed = 'string'
    return hashed

def generate_ChannelImagePath():
    base_path = '/Image/ChannelPicture/Channl_Picture_'
    options = random.randint(1,23)
    return base_path + str(options)

# Fonction pour générer un identifiant de rôle avec une probabilité de 90% pour 1 et 10% pour 2
def generate_role_id():
    return 1 if random.random() < 0.9 else 2

# Fonction pour générer des données pour la table `channel`
def generate_channel_data(num_records):
    sql_commands = []
    for i in range(num_records):
        channel_name = random.choice(channel_names) + random.choice(channel_second_names)
        channel_image_path = generate_ChannelImagePath()
        channel_type_id = random.randint(1, 2)
        sql_command = f'''
            INSERT INTO `channel` (`Channel_Name`, `Channel_ImagePath`, `ChannelType_Id`) 
            VALUES ('{channel_name}', '{channel_image_path}', {channel_type_id});
        '''
        sql_commands.append(sql_command.strip())
    return sql_commands

# Fonction principale pour générer des données pour la table `person` et produire des commandes SQL
def generate_person_data(num_records):
    sql_commands = []
    
    for _ in range(num_records):
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
            INSERT INTO `person` (`Person_Password`, `Person_Email`, `Person_PhoneNumber`, `Person_FirstName`, `Person_LastName`, `Person_CreatedTimePerson`, `Person_ProfilPicturePath`, `Person_Description`, `Person_IsTemporaryPassword`, `PersonJobTitle_Id`, `PersonStatut_Id`, `PersonRole_Id`) 
            VALUES ('', '{email}', '{phone_number}', '{first_name}', '{last_name}', '{created_time}', '{profile_picture_path}', 'Bonjour, je suis {first_name} {last_name}, je suis nouveau sur Quackers', '{is_temporary_password}', '{job_title_id}', '{statut_id}', '{role_id}');
        '''
        sql_commands.append(sql_command.strip())

    return sql_commands

# Fonction pour afficher les données générées
def display_data():
    num_person_records = int(entry_num_person_records.get())
    num_channel_records = int(entry_num_channel_records.get())
    
    person_sql_commands = generate_person_data(num_person_records)
    channel_sql_commands = generate_channel_data(num_channel_records)
    
    for command in person_sql_commands + channel_sql_commands:
        listbox.insert(tk.END, command)

# Fonction pour sauvegarder les données dans un fichier texte
def save_to_file():
    num_person_records = int(entry_num_person_records.get())
    num_channel_records = int(entry_num_channel_records.get())
    
    person_sql_commands = generate_person_data(num_person_records)
    channel_sql_commands = generate_channel_data(num_channel_records)
    
    file_path = filedialog.asksaveasfilename(defaultextension=".txt", filetypes=[("Text files", "*.txt"), ("All files", "*.*")])
    
    if file_path:
        with open(file_path, 'w') as file:
            for command in person_sql_commands + channel_sql_commands:
                file.write(command + "\n")

# Création de la fenêtre principale
root = tk.Tk()
root.title("Générateur de Commandes SQL")

# Création des widgets
label_num_person_records = tk.Label(root, text="Nombre d'enregistrements pour la table `person`:")
label_num_person_records.pack()
entry_num_person_records = tk.Entry(root)
entry_num_person_records.pack()

label_num_channel_records = tk.Label(root, text="Nombre d'enregistrements pour la table `channel`:")
label_num_channel_records.pack()
entry_num_channel_records = tk.Entry(root)
entry_num_channel_records.pack()

button_generate = tk.Button(root, text="Générer", command=display_data)
button_generate.pack()

button_save = tk.Button(root, text="Sauvegarder dans un fichier", command=save_to_file)
button_save.pack()

listbox = tk.Listbox(root, width=100, height=20)
listbox.pack()

# Lancement de la boucle principale
root.mainloop()
