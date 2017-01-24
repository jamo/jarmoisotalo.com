FROM jamo/now-nginx:0.1.0
COPY content/ /app
RUN cd /app \
    && cat jamoboat.mp4* > jamoboat.mp4 \
    && rm jamoboat.mp4.*
COPY nginx.conf /etc/nginx/nginx.conf
