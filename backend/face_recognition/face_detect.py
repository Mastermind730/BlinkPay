import cv2

def capture_face(save_path="captured_face.jpg"):
    cam = cv2.VideoCapture(0)
    if not cam.isOpened():
        raise RuntimeError("Could not access the camera.")

    print("press 'c' to capture face, 'q' to quit")
    while True:
        ret, frame = cam.read()
        if not ret:
            break
        cv2.imshow("Capture Face", frame)

        key = cv2.waitKey(1) & 0xFF
        if key == ord('c'):
            cv2.imwrite(save_path, frame)
            print(f"Face captured and saved to {save_path}")
            break
        elif key == ord('q'):
            print("quit")
            break

    cam.release()
    cv2.destroyAllWindows()
    return save_path

if __name__ == "__main__":
    capture_face()