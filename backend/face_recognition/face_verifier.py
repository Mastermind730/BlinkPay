import os
from deepface import DeepFace

def verify_face(captured_img_path, known_users_folder):
    if not os.path.exists(captured_img_path):
        raise FileNotFoundError(f"Captured image not found: {captured_img_path}")
    
    if not os.path.exists(known_users_folder):
        raise FileNotFoundError(f"Known users folder not found: {known_users_folder}")
    
    for user_img in os.listdir(known_users_folder):
        user_path = os.path.join(known_users_folder, user_img)
        
        if not user_img.lower().endswith((".jpg", ".png", ".jpeg")):
            continue
        
        try:
            result = DeepFace.verify(
                img1_path=captured_img_path,
                img2_path=user_path,
                enforce_detection=True,
                model_name="Facenet",
                detector_backend="retinaface"
            )
            
            if result["verified"]:
                username = os.path.splitext(user_img)[0]
                print(f"Face matched with user!!: {username}")
                return username
        except Exception as e:
            print(f"Error occured: {e}")
    
    print("no matching user found!")
    return None


if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(current_dir, "..", ".."))
    captured_image_path = os.path.join(project_root, "captured_face.jpg")
    known_users_path = os.path.abspath(os.path.join(current_dir, "..", "known_users"))

    verify_face(captured_image_path, known_users_path)