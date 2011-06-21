#open Developer Environment ready to Work on onfire

#launch devilspie to move windows on dedicated workspace 
#install with => sudo apt-get install devilspie 
devilspie $HOME/workspace/onfire/.open_env/*.ds -d &

cd $HOME/workspace/onfire

# set proxy 
#sh setproxy.sh

# open eclipse
eclipse &

# open terminals
gnome-terminal -t titanium studio -x sh -c "/home/nicolas/Downloads/Titanium Studio/TitaniumStudio" --maximize &
gnome-terminal -t titanium dev -x sh -c "/home/nicolas/Downloads/Titanium Developer-1.2.2/Titanium Developer" --maximize &
#gnome-terminal -t autotest -x sh -c "autotest" --maximize &
#gnome-terminal -t irb -x sh -c "rails c" --maximize &
#gnome-terminal -t cucumber --maximize &
#gnome-terminal -t git_gui --maximize &

# open chrome
google-chrome "https://mail.directgroupfrance.fr/OWA" "gmail.com" --process-per-tab &

# open firefox
firefox "http://localhost:3000" "http://120.0.3.120:8080/job/BestAgers/?auto_refresh=true" "http://www.google.com" &

sleep 30

# close devilspie => you can now freely open programs were you want
killall devilspie





