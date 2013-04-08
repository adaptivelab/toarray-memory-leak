# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant::Config.run do |config|
  config.vm.box = "ubuntu-precise64"
  config.vm.box_url = "http://cloud-images.ubuntu.com/precise/current/precise-server-cloudimg-vagrant-amd64-disk1.box"
  config.vm.network :hostonly, "173.16.1.3"
  config.vm.customize ["modifyvm", :id, "--memory", 3072]
  config.vm.provision :shell, :inline => "aptitude -q2 update"
  config.vm.provision :puppet
end
