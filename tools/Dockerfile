# Media-processing toolchain for the Niviya Interiors website.
# Everything runs in-container; nothing is installed on the host.
FROM alpine:3.20

RUN apk add --no-cache \
      imagemagick \
      imagemagick-jpeg \
      imagemagick-webp \
      imagemagick-heic \
      libwebp-tools \
      ffmpeg \
      jpegoptim \
      pngquant \
      font-dejavu \
      fontconfig \
    && fc-cache -f

WORKDIR /work
