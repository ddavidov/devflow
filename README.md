# devflow

ZOOlanders Development Workflow based on [Joomlatools Vagrant Box](http://developer.joomlatools.com/tools/vagrant.html)

## Setting up the environment

1. Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
2. Install [Vagrant](https://www.vagrantup.com/downloads.html)
3. Clone this repo in a directory of your choice and install npm dependencies:

 ```
 git clone git@github.com:JOOlanders/devflow.git
 npm install
 ```

4. Run the following commands in that directory to download and start the Vagrant box:

 ```
 vagrant init joomlatools/box
 vagrant up
 ```

5. Add the following line into your hosts file (/etc/hosts on Linux and Mac OS X):

 ```
 33.33.33.58 joomla.box webgrind.joomla.box phpmyadmin.joomla.box
 ```

6. The dashboard is now available at [joomla.box](http://joomla.box)


### Troubleshooting
- Make sure VirtualBox has been installed properly by launching `virtualbox` from the terminal.
- NFS is required, make sure is installed and enabled.
- In some cases VirtualBox requires ***Virtualisation*** option to be set to **ON** in your BIOS settings.
- If you are not able to reach http://joomla.box or 33.33.33.58 from your browser try follow [this](http://lucrussell.com/unable-to-connect-to-vagrant-guest-vms-in-a-private-network-2) instructions.
- For more information and troubleshooting check [here](http://developer.joomlatools.com/tools/vagrant/getting-started.html)

## Adding an extension

When an extension is added its repository is cloned into `Projects/extensions` folder and symlinked into `Projects/site` getting immediately available to the box.

```
gulp add -e <extension>
```

## Creating new development sites

1. Open up the web terminal by browsing to [joomla.box:3000](http://joomla.box:3000) Alternatively, you can SSH into the box from the command line with the `vagrant ssh` command
2. Create the new site with this command
 ```
 joomla site:create <mysite>
 ```
3. Symlink the development site content running   
 ```
 joomla extension:symlink <mysite> site
 ```
4. Your new site is available at [joomla.box/mysite](http://joomla.box/mysite). You can login using the credentials admin / admin.
5. In *Extension Manager* under *Discover* section click on the **Discover** button to discover the symlinked extensions. Install them as required.

You can get more details about creating sites [here](http://developer.joomlatools.com/tools/vagrant/getting-started.html#creating-new-joomla-sites).
