#!/bin/bash

NOMP_COIN=$1
shift

NOMP_HASH=$1
shift

NOMP_HOST=127.0.0.1:17117

#echo "BlockNotify: $NOMP_HOST $NOMP_COIN $NOMP_HASH" >> /var/log/crypto-pool.blocknotify.log

case $NOMP_COIN in
	bitcoin|dogecoin|litecoin)
		/opt/cryptocurrency/nomp/scripts/blocknotify $NOMP_HOST $NOMP_COIN $NOMP_HASH
		;;
	bitcoincash)
		/opt/cryptocurrency/nomp/scripts/blocknotify $NOMP_HOST 'bitcoin cash' $NOMP_HASH
		;;
	litecoincash)
		/opt/cryptocurrency/nomp/scripts/blocknotify $NOMP_HOST 'litecoin cash' $NOMP_HASH
		;;
	digibyte)
		/opt/cryptocurrency/nomp/scripts/blocknotify $NOMP_HOST 'digibyte - groestl' $NOMP_HASH
		/opt/cryptocurrency/nomp/scripts/blocknotify $NOMP_HOST 'digibyte - qubit' $NOMP_HASH
		/opt/cryptocurrency/nomp/scripts/blocknotify $NOMP_HOST 'digibyte - scrypt' $NOMP_HASH
		/opt/cryptocurrency/nomp/scripts/blocknotify $NOMP_HOST 'digibyte - sha256' $NOMP_HASH
		/opt/cryptocurrency/nomp/scripts/blocknotify $NOMP_HOST 'digibyte - skein' $NOMP_HASH
		;;
esac
