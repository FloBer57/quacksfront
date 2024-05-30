import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updatePerson, verifyCurrentPassword, uploadProfilePicture } from "../services/personService";
import { getUserIdFromToken } from "../services/authService";
import { getPersonById } from "../services/personService";

export const useUserProfile = (navigate) => {
  const [person, setPerson] = useState(null);
  const [activeSection, setActiveSection] = useState('user-management');

  const fetchPersonData = useCallback(async () => {
    const id = getUserIdFromToken();
    if (id) {
      try {
        const personData = await getPersonById(id, navigate);
        setPerson(personData);
      } catch (error) {
        console.error("Error fetching person data:", error);
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchPersonData();
  }, [fetchPersonData]);

  return {
    person,
    activeSection,
    setActiveSection,
    fetchPersonData
  };
};

export const useUserSecurity = (person, fetchPersonData) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    try {
      const isValid = await verifyCurrentPassword(
        person.person_Id,
        currentPassword
      );
      if (!isValid) {
        toast.error("Mot de passe actuel incorrect");
        return;
      }

      const updatePersonDTO = {
        password: newPassword,
      };

      await updatePerson(person.person_Id, updatePersonDTO);
      toast.success("Mot de passe modifié avec succès");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      fetchPersonData();
    } catch (error) {
      toast.error(
        `Erreur lors de la modification du mot de passe: ${error.message}`
      );
    }
  };

  const handlePhoneChange = async (e) => {
    e.preventDefault();

    const updatePersonDTO = {
      phoneNumber: newPhone,
    };

    try {
      await updatePerson(person.person_Id, updatePersonDTO);
      setNewPhone("");
      fetchPersonData();
      toast.success("Numéro de téléphone modifié avec succès");
    } catch (error) {
      toast.error(
        `Erreur lors de la modification du numéro de téléphone`
      );
    }
  };

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    newPhone,
    setNewPhone,
    handlePasswordChange,
    handlePhoneChange
  };
};

export const useUserPersonalisation = (person, fetchPersonData) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageScale, setImageScale] = useState(1.2);
  const editorRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const generateRandomFileName = () => {
    return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
  };

  const handleSave = async () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob(async (blob) => {
        const fileName = generateRandomFileName() + '.jpg';
        const file = new File([blob], fileName, { type: 'image/jpeg' });

        try {
          const response = await uploadProfilePicture(file);
          const updatePersonDTO = {
            profilPicturePath: response.path 
          };

          await updatePerson(person.person_Id, updatePersonDTO);
          toast.success('Image de profil modifiée avec succès');
          fetchPersonData();
        } catch (error) {
          toast.error(`Erreur lors de la modification de l'image de profil`);
        }
      }, 'image/jpeg');
    }
  };

  return {
    selectedImage,
    imageScale,
    setImageScale,
    editorRef,
    handleImageChange,
    handleSave
  };
};
