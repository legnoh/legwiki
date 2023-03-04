get_branch_name_by_pr_number(){
    local token=${1:?}
    local owner=${2:?}
    local repo=${3:?}
    local pr_number=${4:?}
    curl -f -X "GET" "https://api.github.com/repos/${owner}/${repo}/pulls/${pr_number}" \
            -H 'Accept: application/vnd.github.v3+json' \
            -H "Authorization: Bearer ${token}" \
            -H 'Content-Type: application/json; charset=utf-8' \
            | jq -r ".head.ref"
}

create_codespace_for_pr() {
    local token=${1:?}
    local owner=${2:?}
    local repo=${3:?}
    local pr_number=${4:?}

    echo "Creating Codespace: ${owner}/${repo}/${pr_number}"

    curl -f -X "POST" "https://api.github.com/repos/${owner}/${repo}/pulls/${pr_number}/codespaces" \
            -H 'Accept: application/vnd.github.v3+json' \
            -H "Authorization: Bearer ${token}" \
            -H 'Content-Type: application/json; charset=utf-8'
}

