import asyncio
import itertools
import time

import edge_tts

# Available voices
voices = {
    "1": ("Male (US) - Guy", "en-US-GuyNeural"),
    "2": ("Male (US) - Andrew", "en-US-AndrewNeural"),
    "3": ("Female (US) - Ava", "en-US-AvaNeural"),
}

print("===== Select Voice =====")
for key, (name, _) in voices.items():
    print(f"{key}. {name}")

choice = input("Enter your choice: ")

if choice not in voices:
    print("Invalid choice!")
    exit()

voice_name = voices[choice][1]


async def loading(task):
    for symbol in itertools.cycle(r"\|/-"):
        if task.done():
            break

        print(f"\rConverting... {symbol}", end="", flush=True)
        await asyncio.sleep(0.1)


async def main():
    with open("text.txt", "r", encoding="utf-8") as f:
        text = f.read()

    communicate = edge_tts.Communicate(
        text=text,
        voice=voice_name
    )

    start_time = time.perf_counter()

    convert_task = asyncio.create_task(
        communicate.save("output.mp3")
    )

    await asyncio.gather(
        convert_task,
        loading(convert_task)
    )

    elapsed = int(time.perf_counter() - start_time)
    minutes = elapsed // 60
    seconds = elapsed % 60

    print(f"\r✓ Done! Created output.mp3 ({minutes:02}:{seconds:02})      ")


asyncio.run(main())
