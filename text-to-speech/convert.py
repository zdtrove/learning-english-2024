import edge_tts
import asyncio

# Danh sách các giọng
voices = {
    "1": ("Nữ (Mỹ)", "en-US-AvaNeural"),
    "2": ("Nam (Mỹ)", "en-US-AndrewNeural"),
}

print("===== Chọn giọng đọc =====")
for key, (name, _) in voices.items():
    print(f"{key}. {name}")

choice = input("Nhập số: ")

if choice not in voices:
    print("Lựa chọn không hợp lệ!")
    exit()

voice_name = voices[choice][1]

async def main():
    with open("text.txt", "r", encoding="utf-8") as f:
        text = f.read()

    communicate = edge_tts.Communicate(
        text=text,
        voice=voice_name
    )

    await communicate.save("output.mp3")

    print("Đã tạo output.mp3")

asyncio.run(main())