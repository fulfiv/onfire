#open Developer Environment ready to Work on onfire

#launch devilspie to move windows on dedicated workspace 
#install with => sudo apt-get install devilspie 
devilspie $HOME/mobileapps/onfire/.open_env/*.ds -d &

cd $HOME/mobileapps/onfire

# set proxy 
#sh setproxy.sh

# open titanium studio
#. /home/nicolas/Downloads/Titanium\ Studio/TitaniumStudio &
gedit &
cd /home/nicolas/Downloads/Titanium\ Studio
./TitaniumStudio &
cd /home/nicolas/Downloads/Titanium\ Developer-1.2.2
./Titanium\ Developer &
cd /home/nicolas/Downloads/Sublime\ Text\ 2
./sublime_text &

# open terminals
#gnome-terminal -t titanium studio -x sh -c "/home/nicolas/Downloads/Titanium\ Studio/TitaniumStudio" --maximize &
#gnome-terminal -t titanium dev -x sh -c "/home/nicolas/Downloads/Titanium\ Developer-1.2.2/Titanium\ Developer" --maximize &

#creation d'un virtual device et démarrage
#gnome-terminal -t emulator -x sh -c "android create avd -n 'nico_avd_2-3-3' -t 'Google Inc.:Google APIs:10' -s 'HVGA' -f  ; sleep 2 ; emulator #@nico_avd_2-3-3" --maximize &

#Fastdev et premier build
gnome-terminal -t fastdev -x sh -c "cd $HOME/mobileapps/onfire ; $HOME/.titanium/mobilesdk/linux/1.7.2.v20110622103439/titanium.py fastdev start" --maximize &
gnome-terminal -t build -x sh -c "cd $HOME/mobileapps/onfire ; $HOME/.titanium/mobilesdk/linux/1.7.2.v20110622103439/titanium.py run --platform=android --android=/home/nicolas/Downloads/android-sdk-linux_x86" --maximize & 

#gnome-terminal -t coffee_irb -x sh -c "coffee" --maximize &
gnome-terminal -t coffee_build -x sh -c "cd $HOME/mobileapps/onfire ; coffee -c --watch Resources " --maximize &
gnome-terminal -t git_gui --maximize &

# open firefox
#firefox "http://localhost:3000" "http://120.0.3.120:8080/job/BestAgers/?auto_refresh=true" "http://www.google.com" &
# open nautilus
nautilus &

# open chrome
google-chrome "https://mail.directgroupfrance.fr/OWA" "gmail.com" --process-per-tab &

sleep 30

# close devilspie => you can now freely open programs were you want
killall devilspie





