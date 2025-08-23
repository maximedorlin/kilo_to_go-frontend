eval "$(ssh-agent -s)"
ssh-add /home/aft/.ssh/id_rsa_daniel
docker compose -f docker-compose-local.prod.yml stop
git pull
docker compose -f docker-compose-local.prod.yml up -d
