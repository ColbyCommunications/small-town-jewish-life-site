EDGE_HOSTNAME=$(platform environment:info edge_hostname)
JQ="[https://${EDGE_HOSTNAME}]"
echo $(cat .github/sitemap.json | jq --arg JQ '.urls |= $JQ') > .github/sitemap.json
flatten_sitemap --sitemap https://$EDGE_HOSTNAME/sitemap_index.xml --config .github/sitemap.json --limit 20 --randomize