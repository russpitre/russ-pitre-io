
Apache [Commons Daemon](http://commons.apache.org/daemon/index.html) consists of two parts for managing daemon processes 
on both Unix and Windows systems. The first of two is a C library for interacting with the operating system and the 
second part is a Java API for interacting with the daemon. On Windows systems the C part is called 
[Procrun](http://commons.apache.org/daemon/procrun.html) and we'll be using it to create a service wrapper for 
[Apache ActiveMQ](http://activemq.apache.org/). Procrun consists of two executables prunsrv.exe and prunmgr.exe. The 
later is GUI application to manage the windows service after it has been installed.


I was lead to Procrun while setting up ActiveMQ on Windows 2008 server 64-bit. ActiveMQ ships with the popular java 
service wrapper by [Tanuki Software](http://wrapper.tanukisoftware.com) but the community version of the wrapper isn't 
available for 64-bit versions of windows.


If you do go ahead and install the service wrapper that ships with ActiveMQ you'll see this warning in the wrapper.log 
file after starting the ActiveMQ service.


    WARNING - Unable to load the Wrapper's native library 'wrapper.dll'.
               The file is located on the path at the following location but
               could not be loaded:
                 C:\JAVA\apache-activemq-5.3.1\bin\win32\..\..\bin\win32\wrapper.dll
               Please verify that the file is readable by the current user
               and that the file has not been corrupted in any way.
               One common cause of this problem is running a 32-bit version
               of the Wrapper with a 64-bit version of Java, or vica versa.
               This is a 64-bit JVM.
               Reported cause:
                 C:\JAVA\apache-activemq-5.3.1\bin\win32\wrapper.dll: Can't load IA 32-bit .dll on a AMD 64-bit platform
               System signals will not be handled correctly.


I'm assuming you have already downloaded and extracted ActiveMQ.


### Download native binaries


First, you'll need to download Commons Daemon [native binaries](http://commons.apache.org/daemon/download_daemon.cgi) 
and then extract the zip file.


### Copy and Rename


Navigate to the folder specific to the architecture of the OS your installing the service on, in my case it was
amd64. Copy prunsrv.exe to ACTIVEMQ_HOME/bin and then rename the .exe to ActiveMQ.exe. This file is the service
wrapper executable Windows will launch when the OS boots up. Next is to copy prunmgr.exe to ACTIVEMQ_HOME/bin
and rename that to ActiveMQw.exe. Whatever name you choose for renaming prunsrv.exe to, make sure to rename
prunmgr.exe to the same name with ‘w' appended. This is the executable to configure and manage the windows
service after it has been installed.


### Install Service

Open a command prompt in Administrator mode by right-clicking and selecting “Run as Administrator”, this may only
be specific to Server 2008. Navigate to ACTIVEMQ_HOME\bin where you copied the executables to. Run the following
command substituting the path of your installation of ActiveMQ:

    C:\Java\apache-activemq-5.4.1\bin&gt;ActiveMQ.exe //IS//ActiveMQ
            \ --DisplayName="Apache ActiveMQ"
            \ --Description="Apache ActiveMQ Java Messaging Server"
            \ --Startup=auto
            \ --LogPath=C:\Java\apache-activemq-5.4.1\logs
            \ --LogLevel=INFO
            \ --LogPrefix=activemq-daemon
            \ --StdOutput=auto
            \ --StdError=auto
            \ --StartPath=C:\Java\apache-activemq-5.4.1
            \ --StartClass=org.apache.activemq.console.Main
            \ --StartMethod=main
            \ --StartParams=start
            \ --StartMode=jvm
            \ --StopPath=C:\Java\apache-activemq-5.4.1
            \ --StopClass=org.apache.activemq.console.Main
            \ --StopMethod=main
            \ --StopParams=shutdown
            \ --StopMode=jvm
            \ --Jvm=C:\Java\jdk1.6.0_18\jre\bin\server\jvm.dll
            \ --Classpath=C:\Java\apache-activemq-5.4.1\bin\run.jar
            \ --JvmOptions=-Xmx512M
            \ ++JvmOptions=-Dorg.apache.activemq.UseDedicatedTaskRunner=true
            \ ++JvmOptions=-Djava.util.logging.config.file=logging.properties
            \ ++JvmOptions=-Dactivemq.home=C:\Java\apache-activemq-5.4.1
            \ ++JvmOptions=-Dactivemq.base=C:\Java\apache-activemq-5.4.1
            \ ++JvmOptions=-Dactivemq.classpath=C:\Java\apache-activemq-5.4.1\conf
            \ ++JvmOptions=-Dcom.sun.management.jmxremote.port=9004
            \ ++JvmOptions=-Dcom.sun.management.jmxremote.authenticate=false
            \ ++JvmOptions=-Dcom.sun.management.jmxremote.ssl=false

The above command should get you 90% of the way there to a fully configured ActiveMQ windows service. The last
        10% of configuration may be easier with the GUI in a trial and error scenario.

### GUI

Launch the service manager (the executable you renamed ending with ‘w') in Administrator mode. Below are the
        screenshots of each of the tabs in the service manager of fully configured ActiveMQ windows service.

![](http://blog.bigrocksoftware.com/wp-content/uploads/2010/10/amq_service_general.png "amq_service_general")

![](http://blog.bigrocksoftware.com/wp-content/uploads/2010/10/amq_service_logon.png "amq_service_logon")

![](http://blog.bigrocksoftware.com/wp-content/uploads/2010/10/amq_service_loggin.png "amq_service_loggin")

![](http://blog.bigrocksoftware.com/wp-content/uploads/2010/10/amq_service_java.png "amq_service_java")

![](http://blog.bigrocksoftware.com/wp-content/uploads/2010/10/amq_service_startup.png "amq_service_startup")

![](http://blog.bigrocksoftware.com/wp-content/uploads/2010/10/amq_service_shutdown.png "amq_service_shutdown")

UPDATE:

The above screenshot of the shutdown tab is mis-configured, use these as the arguments instead adjusting the jmx
        port if needed:

    stop
    --all
    --jmxurl
    service:jmx:rmi:///jndi/rmi://localhost:9004/jmxrmi
