#!/bin/bash

# Change to script directory to ensure npm commands work
cd "$(dirname "$0")" || exit

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color



show_menu() {
    clear
    
    # Get terminal width
    TERM_WIDTH=$(tput cols)
    
    # Show appropriate banner based on terminal width
    if [ "$TERM_WIDTH" -ge 95 ]; then
        # Full banner for wide terminals
        echo -e "${CYAN}    ██╗  ██╗██╗███╗   ██╗ ██████╗ ${MAGENTA}    ██████╗ ██╗██╗     ██╗  ██╗   ██╗${NC}"
        echo -e "${CYAN}    ██║ ██╔╝██║████╗  ██║██╔════╝ ${MAGENTA}    ██╔══██╗██║██║     ██║  ╚██╗ ██╔╝${NC}"
        echo -e "${CYAN}    █████╔╝ ██║██╔██╗ ██║██║  ███╗${MAGENTA}    ██████╔╝██║██║     ██║   ╚████╔╝ ${NC}"
        echo -e "${BLUE}    ██╔═██╗ ██║██║╚██╗██║██║   ██║${YELLOW}    ██╔══██╗██║██║     ██║    ╚██╔╝  ${NC}"
        echo -e "${BLUE}    ██║  ██╗██║██║ ╚████║╚██████╔╝${YELLOW}    ██████╔╝██║███████╗███████╗██║   ${NC}"
        echo -e "${BLUE}    ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ${YELLOW}    ╚═════╝ ╚═╝╚══════╝╚══════╝╚═╝   ${NC}"
        echo ""
        echo -e "${GREEN}                           🎰 Automated Testing Framework 🎰${NC}"
    elif [ "$TERM_WIDTH" -ge 60 ]; then
        # Compact banner for medium terminals - smaller version of full banner
        echo -e "${CYAN}██╗  ██╗██╗███╗   ██╗ ██████╗ ${MAGENTA} ██████╗ ██╗██╗     ██╗  ██╗   ██╗${NC}"
        echo -e "${CYAN}██║ ██╔╝██║████╗  ██║██╔════╝ ${MAGENTA} ██╔══██╗██║██║     ██║  ╚██╗ ██╔╝${NC}"
        echo -e "${CYAN}█████╔╝ ██║██╔██╗ ██║██║  ███╗${MAGENTA} ██████╔╝██║██║     ██║   ╚████╔╝ ${NC}"
        echo -e "${BLUE}██╔═██╗ ██║██║╚██╗██║██║   ██║${YELLOW} ██╔══██╗██║██║     ██║    ╚██╔╝  ${NC}"
        echo -e "${BLUE}██║  ██╗██║██║ ╚████║╚██████╔╝${YELLOW} ██████╔╝██║███████╗███████╗██║   ${NC}"
        echo -e "${BLUE}╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ${YELLOW} ╚═════╝ ╚═╝╚══════╝╚══════╝╚═╝   ${NC}"
        echo ""
        echo -e "${GREEN}      🎰 Test Framework 🎰${NC}"
    else
        # Minimal banner for narrow terminals
        echo -e "${GREEN}🎰 KING BILLY Tests${NC}"
        echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━${NC}"
    fi
    echo ""
    echo -e "${GREEN}1)${NC} Install Dependencies"
    echo -e "${GREEN}2)${NC} Pull latest updates from Git"
    echo -e "${GREEN}3)${NC} Install Playwright browsers"
    echo -e "${GREEN}4)${NC} Open Playwright Test UI"
    echo -e "${MAGENTA}5)${NC} Run Tests ➜  ${CYAN}Test menu${NC}"
    echo -e "${GREEN}6)${NC} Exit"
    echo -e "${CYAN}============================${NC}"
    echo -n "Please choose an option [1-6]: "
}


show_test_menu() {
    clear
    
    # Get terminal width for adaptive layout
    TERM_WIDTH=$(tput cols)
    
    if [ "$TERM_WIDTH" -ge 80 ]; then
        # Full fancy box for wider terminals
        echo -e "${MAGENTA}┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓${NC}"
        echo -e "${MAGENTA}┃${CYAN}   🧪  TEST SANCTUARY · AUTOMATED QUALITY GATEWAY  🧪                 ${MAGENTA}┃${NC}"
        echo -e "${MAGENTA}┃${CYAN}      Smoke, regression & rituals for bug exorcism 🔥                  ${MAGENTA}┃${NC}"
        echo -e "${MAGENTA}┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫${NC}"
        echo -e "${MAGENTA}┃${NC}  ${GREEN}[1]${NC} AU Healthcheck              ${YELLOW}⚡ Quick health check${NC}                 ${MAGENTA}┃${NC}"
        echo -e "${MAGENTA}┃${NC}  ${GREEN}[2]${NC} AU Healthcheck (Fast)       ${YELLOW}🚀 Fast health check${NC}                 ${MAGENTA}┃${NC}"
        echo -e "${MAGENTA}┃${NC}  ${GREEN}[3]${NC} Regression Tests ➜          ${BLUE}📋 Regression submenu${NC}                ${MAGENTA}┃${NC}"
        echo -e "${MAGENTA}┃${NC}  ${GREEN}[4]${NC} Deposit Flow Tests          ${CYAN}📦 Payment flow tests${NC}                ${MAGENTA}┃${NC}"
        echo -e "${MAGENTA}┃${NC}  ${GREEN}[5]${NC} Deposit Modal Tests         ${CYAN}🔲 Modal tests${NC}                       ${MAGENTA}┃${NC}"
        echo -e "${MAGENTA}┃${NC}  ${GREEN}[6]${NC} Dep Bible                   ${MAGENTA}📖 Deposit bible${NC}                    ${MAGENTA}┃${NC}"
        echo -e "${MAGENTA}┃${NC}  ${YELLOW}[0]${NC} Back to Main Menu          ${CYAN}🏠 Return to control center${NC}          ${MAGENTA}┃${NC}"
        echo -e "${MAGENTA}┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫${NC}"
        echo -e "${MAGENTA}┃${NC}  ${CYAN}💡 Tip: Keep an eye on logs, not just the green checks${NC}              ${MAGENTA}┃${NC}"
        echo -e "${MAGENTA}┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛${NC}"
    else
        # Simplified menu for narrower terminals
        echo -e "${MAGENTA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${CYAN}  🧪  TEST MENU${NC}"
        echo -e "${MAGENTA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "  ${GREEN}[1]${NC} AU Healthcheck              ${YELLOW}⚡${NC}"
        echo -e "  ${GREEN}[2]${NC} AU Healthcheck (Fast)       ${YELLOW}🚀${NC}"
        echo -e "  ${GREEN}[3]${NC} Regression Tests ➜          ${BLUE}📋${NC}"
        echo -e "  ${GREEN}[4]${NC} Deposit Flow Tests          ${CYAN}📦${NC}"
        echo -e "  ${GREEN}[5]${NC} Deposit Modal Tests         ${CYAN}🔲${NC}"
        echo -e "  ${GREEN}[6]${NC} Dep Bible                   ${MAGENTA}📖${NC}"
        echo -e "  ${YELLOW}[0]${NC} Back to Main Menu          ${CYAN}🏠${NC}"
        echo -e "${MAGENTA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    fi
    echo ""
    echo -n "Please choose an option [0-6]: "
}


install_dependencies() {
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
    npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Dependencies installed successfully!${NC}"
else
    echo -e "${RED}Failed to install dependencies.${NC}"
fi
read -p "Press [Enter] to continue..."
}

pull_latest() {
    echo -e "${YELLOW}Pulling latest updates from Git...${NC}"
    git pull origin main
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Successfully pulled latest updates!${NC}"
    else
        echo -e "${RED}Failed to pull updates from Git.${NC}"
    fi
    read -p "Press [Enter] to continue..."
}

install_browsers() {
    echo -e "${YELLOW}Installing Playwright browsers...${NC}"
    npx playwright install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Playwright browsers installed successfully!${NC}"
    else
        echo -e "${RED}Failed to install Playwright browsers.${NC}"
    fi
    read -p "Press [Enter] to continue..."
}

run_au_healthcheck() {
    echo -e "${YELLOW}Running AU Healthcheck...${NC}"
    npm run test:au-healthcheck
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}AU Healthcheck completed successfully!${NC}"
    else
        echo -e "${RED}Some AU Healthcheck tests failed.${NC}"
    fi
    read -p "Press [Enter] to continue..."
}

run_au_healthcheck_fast() {
    echo -e "${YELLOW}Running AU Healthcheck (Fast)...${NC}"
    npm run test:au-healthcheck-fast
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}AU Healthcheck (Fast) completed successfully!${NC}"
    else
        echo -e "${RED}Some AU Healthcheck tests failed.${NC}"
    fi
    read -p "Press [Enter] to continue..."
}

run_dep_flow() {
    echo -e "${YELLOW}Running Deposit Flow tests...${NC}"
    npm run test:dep-flow
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Deposit Flow tests completed successfully!${NC}"
    else
        echo -e "${RED}Some Deposit Flow tests failed.${NC}"
    fi
    read -p "Press [Enter] to continue..."
}

run_dep_modal() {
    echo -e "${YELLOW}Running Deposit Modal tests...${NC}"
    npm run test:dep-modal
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Deposit Modal tests completed successfully!${NC}"
    else
        echo -e "${RED}Some Deposit Modal tests failed.${NC}"
    fi
    read -p "Press [Enter] to continue..."
}

run_dep_bible() {
    echo -e "${YELLOW}Running Dep Bible...${NC}"
    npm run dep-bible
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Dep Bible completed successfully!${NC}"
    else
        echo -e "${RED}Some Dep Bible tests failed.${NC}"
    fi
    read -p "Press [Enter] to continue..."
}

# Regression submenu
show_regression_menu() {
    clear
    echo -e "${BLUE}┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓${NC}"
    echo -e "${BLUE}┃${CYAN}   📋  REGRESSION TESTS SUBMENU                   ${BLUE}┃${NC}"
    echo -e "${BLUE}┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫${NC}"
    echo -e "${BLUE}┃${NC}  ${GREEN}[1]${NC} Default Regression                         ${BLUE}┃${NC}"
    echo -e "${BLUE}┃${NC}  ${GREEN}[2]${NC} KB-Bet1 Regression                         ${BLUE}┃${NC}"
    echo -e "${BLUE}┃${NC}  ${GREEN}[3]${NC} KB-Win Regression                          ${BLUE}┃${NC}"
    echo -e "${BLUE}┃${NC}  ${GREEN}[4]${NC} KB-17 Regression                           ${BLUE}┃${NC}"
    echo -e "${BLUE}┃${NC}  ${YELLOW}[0]${NC} Back to Test Menu                          ${BLUE}┃${NC}"
    echo -e "${BLUE}┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛${NC}"
    echo ""
    echo -n "Please choose an option [0-4]: "
}

run_regression_default() {
    echo -e "${YELLOW}Running Default Regression tests...${NC}"
    npm run test:regression:default
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Default Regression tests completed successfully!${NC}"
    else
        echo -e "${RED}Some Default Regression tests failed.${NC}"
    fi
    read -p "Press [Enter] to continue..."
}

run_regression_kb_bet1() {
    echo -e "${YELLOW}Running KB-Bet1 Regression tests...${NC}"
    npm run test:regression:kb-bet1
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}KB-Bet1 Regression tests completed successfully!${NC}"
    else
        echo -e "${RED}Some KB-Bet1 Regression tests failed.${NC}"
    fi
    read -p "Press [Enter] to continue..."
}

run_regression_kb_win() {
    echo -e "${YELLOW}Running KB-Win Regression tests...${NC}"
    npm run test:regression:kb-win
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}KB-Win Regression tests completed successfully!${NC}"
    else
        echo -e "${RED}Some KB-Win Regression tests failed.${NC}"
    fi
    read -p "Press [Enter] to continue..."
}

run_regression_kb_17() {
    echo -e "${YELLOW}Running KB-17 Regression tests...${NC}"
    npm run test:regression:kb-17
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}KB-17 Regression tests completed successfully!${NC}"
    else
        echo -e "${RED}Some KB-17 Regression tests failed.${NC}"
    fi
    read -p "Press [Enter] to continue..."
}

regression_menu_loop() {
    while true; do
        show_regression_menu
        read reg_choice
        
        case $reg_choice in
            1) run_regression_default ;;
            2) run_regression_kb_bet1 ;;
            3) run_regression_kb_win ;;
            4) run_regression_kb_17 ;;
            0) return ;;
            *) 
                echo -e "${RED}Invalid option. Please try again.${NC}"
                sleep 2
                ;;
        esac
    done
}

open_test_ui() {
    echo -e "${YELLOW}Opening Playwright Test UI...${NC}"
    npx playwright test --ui
    read -p "Press [Enter] to continue..."
}


test_menu_loop() {
    while true; do
        show_test_menu
        read test_choice
        
        case $test_choice in
            1) run_au_healthcheck ;;
            2) run_au_healthcheck_fast ;;
            3) regression_menu_loop ;;
            4) run_dep_flow ;;
            5) run_dep_modal ;;
            6) run_dep_bible ;;
            0) return ;; # Return to main menu
            *) 
                echo -e "${RED}Invalid option. Please try again.${NC}"
                sleep 2
                ;;
        esac
    done
}

while true; do
show_menu
read choice

case $choice in
        1) install_dependencies ;;
        2) pull_latest ;;
        3) install_browsers ;;
        4) open_test_ui ;;
        5) test_menu_loop ;;
        6) echo -e "${MAGENTA}Exiting...${NC}"; exit 0 ;;
        *) echo -e "${RED}Invalid option. Please try again.${NC}" ;;
    esac
done
