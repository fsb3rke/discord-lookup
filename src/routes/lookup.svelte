<script lang="ts">

    let username: string = "invalid_body";
    let globalName: string;
    let avatarURL: string;
    let bannerURL: string;
    let hexAccentColor: string;
    let createdAt: string;
    let isBot: boolean;

    const showData = async () => {
        const inputDataValue: string = (<HTMLInputElement>document.getElementById("inp_id")).value;
        
        if (inputDataValue.length < 17) {
            return;
        }

        try {
            console.log(`http://localhost:2117/api/dclookup?id=${inputDataValue}`);
            
            const response = await fetch(`http://localhost:2117/api/dclookup?id=${inputDataValue}`);
            const data = await response.json()

            console.log(data);
            
            username = data["username"];
            globalName = data["globalName"];
            avatarURL = data["avatarURL"];
            bannerURL = data["bannerURL"];
            hexAccentColor = data["hexAccentColor"];
            createdAt = data["createdAt"];
            isBot = data["isBot"];
        } catch (err) {
            console.error("Fetch Error:", err);
        }
        
    }


</script>

<div class="_input">
    <span style="margin-left: .45rem; color: white;">Account ID: </span>
    <div>
        <input type="text" id="inp_id">
    </div>
    <a class="discord-lookup_btn" id="btn_showData" href="#crd-ctr" on:click={() => showData()}>
        Show The Data
    </a>
</div>
{#if username != "invalid_body"}
<div class="card-container" id="crd-ctr">
    
    <div class="card-user-banner">
        {#if bannerURL != "invalid_body" || hexAccentColor != "invalid_body"}
        <img src="{bannerURL}" style="border-radius: 10px 10px 0 0; max-width: 100%;" alt="banner">
        {/if}
    </div>

    <div class="card-user-info">
        <img class="card-user-avatar" src="{avatarURL}" alt="avatar"><br>
        <div class="card-user-detail">
            <span class="card-user-global-name">{globalName}</span><br>
            <span class="card-user-user-name">{username}</span><br><br>
            {#if hexAccentColor != "invalid_body"}
            <span style="background: {hexAccentColor};">{hexAccentColor}</span><br>
            {/if}
            <span>{isBot}</span><br><br>
            <span style="margin-left: 3.8rem;">
                {createdAt.split(' ').map((x, i) => {
                    let stack_data = [];
                    if (i < 4) {
                        stack_data.push(x);
                    }
                    return stack_data;
                }).join(' ').trim()}
            </span><br>
        </div>
    </div>
</div>
{/if}


<style>

    .discord-lookup_btn {
        margin: 8px 0;
        padding: 8px 10px;
        background: black;
        color: white;
        text-decoration: none;
        border-radius: 0 0 10px 10px;
    }

    input[type=text] {
        width: 50%;
        padding: 10px 10px;
        margin: 8px 0;
        border-radius: 10px;
        box-sizing: border-box;
        border: 1px solid #555;
        outline: none;
        font-size: 20px;
        text-align: center;
    }

    ._input {
        padding: 2rem;
        text-align: center;
        background: gray;
    }

    .card-container {
        align-items: center;
        justify-content: center;
        text-align: center;
        margin: auto;
        padding: 2rem;
        width: 50%;
        border-radius: 10px;
        background: darkgray;
        box-shadow: rgb(70, 70, 70) 0px 20px 30px -10px;
    }

    .card-user-banner {
        width: 100%;
    }

    .card-user-avatar {
        border-radius: 50%;
        width: 7rem;
        margin-right: 18rem;
        margin-top: -5rem;
        padding: .3rem;
        background: darkgray;
    }

    .card-user-detail {
        margin-right: 18rem;
    }

    .card-user-global-name {
        font-size: 1.2rem;
        margin-left: .7rem;
        margin-right: 1rem;
    }

    .card-user-user-name {
        margin-left: .5rem;
        margin-right: 1rem;
    }

</style>