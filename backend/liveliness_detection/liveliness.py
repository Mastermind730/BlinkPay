import cv2
import math
import mediapipe as mp

mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(static_image_mode = False, max_num_faces = 1)

def euclidean_distance(p1, p2):
    return math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2)

#eye aspect ratio: EAR
def calculate_ear(eye):
    A = euclidean_distance(eye[1], eye[5])
    B = euclidean_distance(eye[2], eye[4])
    C = euclidean_distance(eye[0], eye[3])
    ear = (A + B) / (2.0 * C)
    return ear

def detect_blink(frame):
    results = face_mesh.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    if not results.multi_face_landmarks:
        return False
    
    face_landmarks = results.multi_face_landmarks[0]
    h, w = frame.shape[:2]
    landmarks = [(int(p.x * w), int(p.y * h)) for p in face_landmarks.landmark]

    left_eye_idx = [362, 385, 387, 263, 373, 380]
    right_eye_idx = [33, 160, 158, 133, 153, 144]

    left_eye = [landmarks[i] for i in left_eye_idx]
    right_eye = [landmarks[i] for i in right_eye_idx]

    left_ear = calculate_ear(left_eye)
    right_ear = calculate_ear(right_eye)
    avg_ear = (left_ear + right_ear) / 2.0

    return avg_ear < 0.22

def detect_head_movement(frame):
    results = face_mesh.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    if not results.multi_face_landmarks:
        return False    
    
    face_landmarks = results.multi_face_landmarks[0]
    h, w = frame.shape[:2]
    landmarks = [(int(p.x * w), int(p.y * h)) for p in face_landmarks.landmark]

    left_eye = landmarks[33]
    right_eye = landmarks[263]
    nose = landmarks[1]

    eye_center_x = (left_eye[0] + right_eye[0]) / 2
    nose_offset = nose[0] - eye_center_x

    return abs(nose_offset) > 15


if __name__ == "__main__":
    cap = cv2.VideoCapture(0)
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if detect_blink(frame):
            cv2.putText(frame, "Blink Detected", (30, 60), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        if detect_head_movement(frame):
            cv2.putText(frame, "Head Movement Detected", (30, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

        
        cv2.imshow("Liveliness Detection", frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()
