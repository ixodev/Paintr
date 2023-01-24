# RealESRGAN

We have provided the following models:

1. realesr-animevideov3 (default)
2. realesrgan-x4plus
3. realesrgan-x4plus-anime

Command:

You may need to change file mode before running.

chmod u+x realesrgan-ncnn-vulkan

1. ./realesrgan-ncnn-vulkan -i input.jpg -o output.png
2. ./realesrgan-ncnn-vulkan -i input.jpg -o output.png -n realesr-animevideov3
3. ./realesrgan-ncnn-vulkan -i input_folder -o outputfolder -n realesr-animevideov3 -s 2 -f jpg
4. ./realesrgan-ncnn-vulkan -i input_folder -o outputfolder -n realesr-animevideov3 -s 4 -f jpg

If you encounter the problem that *macOS cannot verify that this app is free from Malware*, you have two options to try:

1. Choose *Apple menu* > go to *System Preferences* > choose *Security & Privacy* > tap the General tab > click the *Open Anyway* button.
2. OR run command:  `sudo spctl --master-disable`  to disable Gatekeeper.

------------------------

GitHub: https://github.com/xinntao/Real-ESRGAN/
Paper: https://arxiv.org/abs/2107.10833

------------------------

This executable file is **portable** and includes all the binaries and models required. No CUDA or PyTorch environment is needed.

Note that it may introduce block inconsistency (and also generate slightly different results from the PyTorch implementation), because this executable file first crops the input image into several tiles, and then processes them separately, finally stitches together.

This executable file is based on the wonderful [Tencent/ncnn](https://github.com/Tencent/ncnn) and [realsr-ncnn-vulkan](https://github.com/nihui/realsr-ncnn-vulkan) by [nihui](https://github.com/nihui).
